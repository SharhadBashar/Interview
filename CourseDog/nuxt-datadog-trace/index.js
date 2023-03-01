module.exports = function DatadogTrace(moduleOptions) {
  const path = require('path')
  const hostAppPkg = require(path.resolve(this.options.rootDir, 'package.json'))

  let mergedOptions = {
    hostname: process.env.DD_AGENT_HOST || 'localhost',
    env: process.env.DD_ENV,
    service: process.env.DD_SERVICE || hostAppPkg.name,
    logInjection: true,
    ...moduleOptions,
    ...this.options.datadogTrace
  }
  require('dd-trace').init(mergedOptions)
}

module.exports.meta = require('./package.json')
