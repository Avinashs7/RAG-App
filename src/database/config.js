require('dotenv').config()
const mongoose = require('mongoose')
const { DB_NAME } = require('../constants.js')
const { logger } = require('../utils/CustomLogger.js')

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    logger.info(`MongoDB connected !! DB Host: ${instance.connection.host}`)
  } catch (error) {
    logger.error('MongoDB Connection Failed \n', error)
    process.exit(1)
  }
}

module.exports = { connectDB }
