const core = require('@actions/core')
const { Octokit } = require('@octokit/rest')

const Notion = require('./../utils/notion')

try {
  const {
    GITHUB_REF,
  } = process.env

  const allowedBranches = [
    'refs/heads/master',
    'refs/heads/main',
    'refs/heads/staging',
    'refs/heads/dev',
  ]

  if (allowedBranches.indexOf(GITHUB_REF)  !== -1) {
    const branchName = GITHUB_REF.split('/').pop()
    _updateNotionStatuses(branchName)
  }
} catch (error) {
  core.setFailed(error.message)
}

function extractPrNumber (commitMessage) {
  const match = commitMessage
    .match(/#[0-9]{1,4}/)

  if (match && match.length) {
    return match[0].substring(1)
  }
  return undefined
}

/**
 * Function to update the status of the tasks based on
 * the recent commit is getting merged to which branch
 *
 * @param {'main' | 'dev' | 'staging' | 'master' } branch Name of the branch to which the commit is getting merged to
 */
async function _updateNotionStatuses (branch) {

  const {
    GITHUB_REPOSITORY,
    GITHUB_TOKEN,
  } = process.env

  const octokit = new Octokit({
    auth: GITHUB_TOKEN,
  })

  const NOTION_DATABASE_TOKEN = core.getInput('NOTION_DATABASE_TOKEN')
  const NOTION_API_KEY = core.getInput('NOTION_API_KEY')

  const notionUtil = new Notion({
    apiKey: NOTION_API_KEY,
    databaseToken: NOTION_DATABASE_TOKEN,
  })

  const [ githubOwner, repositoryName ] = GITHUB_REPOSITORY.split('/')
  
  // Get most recent commit to branch
  const { data } = await octokit.rest.repos.getCommit({
    owner: githubOwner,
    repo: repositoryName,
    ref: branch,
    perPage: 1,
    page: 1,
  })

  const {
    commit: {
      message: commitMessage,
    },
  } = data

  switch (branch) {
    case 'master':
    case 'main':
      if (commitMessage.includes('from coursedog/staging')) {
        // Update all tasks that are in Completed Staging to Completed Prod
        notionUtil.updateByStatus('Completed (Staging)', 'Completed (Production)')
      } else if (commitMessage.match(/#+[0-9]/)) {
        // direct from open PR to staging
        const prNumber = extractPrNumber(commitMessage)
        if (!prNumber) return
        notionUtil.updateByPR(`${repositoryName}/pull/${prNumber}`, 'Completed (Production)')
      }
      break
    case 'staging':
      if (commitMessage.includes('from coursedog/dev')) {
        // Update all tasks that are in Completed Dev to Completed Staging
        notionUtil.updateByStatus('Completed (Dev)', 'Completed (Staging)')
      } else if (commitMessage.match(/#+[0-9]/)) {
        // direct from open PR to staging
        const prNumber = extractPrNumber(commitMessage)
        if (!prNumber) return
        notionUtil.updateByPR(`${repositoryName}/pull/${prNumber}`, 'Completed (Staging)')
      }
      break
    case 'dev':
      if (commitMessage.match(/#+[0-9]/)) {
        // direct from open PR to dev
        const prNumber = extractPrNumber(commitMessage)
        if (!prNumber) return
        notionUtil.updateByPR(`${repositoryName}/pull/${prNumber}`, 'Completed (Dev)')
      }
      break
  
    default:
      break
  }
}
