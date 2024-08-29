const getLogger = require('loglevel-colored-level-prefix')
const options = { prefix: 'RAG-app', level: 'trace' }
const logger = getLogger(options)

module.exports = { logger }
