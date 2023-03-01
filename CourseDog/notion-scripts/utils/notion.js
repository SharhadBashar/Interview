const fs = require('fs')
const { Client }= require('@notionhq/client')

class Notion {
  constructor ({ apiKey, databaseToken, testDatabase }) {
    // Retrieving all the input parameters relevant to notion
    this.notionDatabaseToken = databaseToken
    this.testDatabase = testDatabase
      
    // Initializing the notion client
    this.client = new Client({ auth: apiKey })
    this.labels = {
      GITHUB_PR: 'GitHub PR',
      STATUS: 'Status',
      DATE_COMPLETED: 'Date Completed',
    }
  }

  /**
   * Function to update the status of a particular task from one to the other one
   *
   * @param {String} originalStatus Status from which the task is to be moved
   * @param {String} newStatus Status to which the status is to be moved
   */
  async updateByStatus (originalStatus, newStatus) {
    console.log('Updating all Notion tasks from', originalStatus, 'to', newStatus)
    const databaseId = this.notionDatabaseToken
    const {
      GITHUB_REPOSITORY,
    } = process.env
    const repositoryName = GITHUB_REPOSITORY.split('/').pop()

    const listOfTasks = await this.client.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: this.labels.STATUS,
            select: {
              equals: originalStatus,
            },
          },
          {
            property: this.labels.GITHUB_PR,
            text: {
              contains: repositoryName,
            },
          },
        ],
      },
    })
    for (let i = 0; i < listOfTasks.results.length; i++) {
      const updatedTasks = await this.client.pages.update({
        page_id: listOfTasks.results[i].id,
        properties: {
          Status: {
            select: {
              name: newStatus,
            },
          },
        },
      })
      console.log('Updated', updatedTasks)
    }
  }

  /**
   * Function to promote the task by the Github PR field
   *
   * @param {String} pr PR URL for which the status is to be updated
   * @param {String} newStatus New status to which the task is to be promoted
   */
  async updateByPR (pr, newStatus) {
    console.log('Updating one Notion task with PR', pr, 'to', newStatus)
    const databaseId = this.notionDatabaseToken
    const listOfTasks = await this.client.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: this.labels.GITHUB_PR,
            text: {
              contains: pr,
            },
          },
          {
            property: this.labels.STATUS,
            select: {
              does_not_equal: 'Completed (old)',
            },
          },
          {
            property: this.labels.STATUS,
            select: {
              does_not_equal: 'Completed (Production)',
            },
          },
        ],
      },
    })
    for (let i = 0; i < listOfTasks.results.length; i++) {
      const updatedTasks = await this.client.pages.update({
        page_id: listOfTasks.results[i].id,
        properties: {
          [this.labels.STATUS]: {
            select: {
              name: newStatus,
            },
          },
          [this.labels.DATE_COMPLETED]: {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      })
      console.log('Updated', updatedTasks)
    }
  }

  /**
   * Function to create a new feature block
   *
   * @param {String} object.content   Content of the feature block
   * @param {String} object.name      Name of the page block which is to be used
   * @param {String} object.product   Product of the feature block
   * @param {String} object.fileUrl   URL of the file where the feature file is present
   */
  async _createFeatureBlock ({
    content,
    name,
    product,
    fileUrl,
  }) {
    return this.client.pages.create({
      parent: {
        database_id: this.testDatabase,
      },
      properties: {
        Name: {
          title: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        File: {
          url: fileUrl,
        },
        Product: {
          multi_select: [
            { name: product },
          ],
        },
        Status: {
          select: {
            name: 'Implemented',
          },
        },
      },
      children: [
        {
          object: 'block',
          type: 'code',
          code: {
            text: content,
            language: 'gherkin',
          },
        },
      ],
    })
  }
  
  /**
   * Function to update an existing feature block
   *
   * @param {Object} card             Page object fetched from notion which is to be updated
   * @param {String} object.content   Content of the feature block
   * @param {String} object.name      Name of the page block which is to be used
   * @param {String} object.product   Product of the feature block
   * @param {String} object.fileUrl   URL of the file where the feature file is present
   */
  async _updateFeatureBlock (card, {
    content,
    name,
    product,
    fileUrl,
  }) {
    await this.client.pages.update({
      page_id: card.id,
      properties: {
        Name: {
          title: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        File: {
          url: fileUrl,
        },
        Product: {
          multi_select: [
            { name: product },
          ],
        },
        Status: {
          select: {
            name: 'Implemented',
          },
        },
      },
    })
  
    const pageBlocks = await this.client.blocks.children.list({
      block_id: card.id,
      page_size: 100,
    })
    // NOTE: We find the first block that is unsupported (likely the divider) starting from the bottom
    const dividerIndex = pageBlocks.results
      .reverse()
      .findIndex(block => block.type === 'unsupported')
  
    const blocksToDelete = pageBlocks.results.slice(0, dividerIndex)
  
    // NOTE: Delete all blocks after the last unsupported block (likely the divider)
    if (blocksToDelete.length) {
      for (const block of blocksToDelete) {
        await this.client.blocks.delete({
          block_id: block.id,
        })
      }
    }
  
    // NOTE: Restore the feature block
    await this.client.blocks.children.append({
      block_id: card.id,
      children: [
        {
          object: 'block',
          type: 'code',
          code: {
            text: content,
            language: 'gherkin',
          },
        },
      ],
    })
  }

  /**
   * Utility Function to return the product under which this .feature file belongs
   *
   * @param {String} filePath Path of the file for which the product is to be determined
   * @returns {String} Name of the product which is to be used to tag the file
   */
  __getProduct (filePath) {
    
    const {
      GITHUB_REPOSITORY,
    } = process.env

    const repositoryName = GITHUB_REPOSITORY.split('/').pop()

    if (repositoryName === 'coursedog-catalog') {
      return 'Catalog'
    }
    if (repositoryName === 'coursedog-events') {
      return 'Events'
    }

    switch (true) {
      case filePath.includes('/cm/'):
        return 'Curriculum'
      case filePath.includes('/em/'):
        return 'Events'
      case filePath.includes('/ca/'):
        return 'Catalog'
      case filePath.includes('/sm/'):
        return 'Scheduling'
      default:
        return 'All'
    }
  }

  /**
   * Function to create or update an existing feature block in notion by
   * the path of the feature file
   *
   * @param {String} filePath Path of the file where the feature file exists
   * @returns {Promise} Returns promise around whether
   */
  async createOrUpdateFeatureBlock (filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8')

    const lines = fileContent.split('\n')
    const children = []
    let i; let j; const chunk = 7
    // break up the lines into multiple chunks to avoid
    // Notion API limits
    for (i = 0, j = lines.length; i < j; i += chunk) {
      children.push(lines.slice(i, i + chunk))
    }

    const textChildren = children.map(group => ({
      type: 'text',
      text: {
        content: group.join('\n'),
      },
    }))

    const firstLine = (fileContent.match(/(^.*)/) || [])[1] || ''
    const product = this.__getProduct(filePath)
    const {
      GITHUB_REPOSITORY,
    } = process.env
    const fileUrl = `https://github.com/${GITHUB_REPOSITORY}/blob/dev/${filePath.substring(5)}`

    const existingCards = await this.client.databases.query({
      database_id: this.testDatabase,
      filter: {
        or: [
          {
            property: 'File',
            text: {
              contains: fileUrl,
            },
          },
          {
            property: 'Name',
            text: {
              contains: firstLine,
            },
          },
        ],
      },
    })

    if (existingCards.results.length) {
      return existingCards.results.map(card => this._updateFeatureBlock(card, {
        content: textChildren,
        name: firstLine,
        product,
        fileUrl,
      }))
    } else {
      return this._createFeatureBlock({
        content: textChildren,
        name: firstLine,
        product,
        fileUrl,
      })
    }
  }
  
}

module.exports = Notion
