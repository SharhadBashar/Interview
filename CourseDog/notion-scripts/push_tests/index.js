const glob = require('glob')
const core = require('@actions/core')
const Notion = require('./../utils/notion')

async function _getFeatureFiles (featureFilePath) {
  return new Promise((resolve, reject) => {
    glob(featureFilePath, (err, files) => {
      if (err) {
        reject(err)
      }

      resolve(files)
    })
  })
}

(async () => {
    
  const TEST_FILE_PATH = core.getInput('TEST_FILE_PATH')
  const NOTION_TESTS_DATABASE = core.getInput('NOTION_TESTS_DATABASE')
  const NOTION_API_KEY = core.getInput('NOTION_API_KEY')

  const notionUtil = new Notion({
    apiKey: NOTION_API_KEY,
    testDatabase: NOTION_TESTS_DATABASE,
  })
    
  const testFilePaths = TEST_FILE_PATH.split(',').map((p) => p.trim())
  for (let index = 0; index < testFilePaths.length; index++) {
    const eachFilePath = testFilePaths[index]
    const files = await _getFeatureFiles(eachFilePath)
    
    await Promise.all(files.map(async filePath => {
      notionUtil.createOrUpdateFeatureBlock(filePath)
    }))
  }
})().catch((error) => {
  core.setFailed(error.message)
})
  
