require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const ApiResponse = require('./utils/ApiResponse.js')
const ApiError = require('./utils/ApiError.js')
const morgan = require('morgan')
const { connectDB } = require('./database/config.js')

const documentRouter = require('./routes/document.route.js')
const chatRouter = require('./routes/chat.router.js')
const { logger } = require('./utils/CustomLogger.js')

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/documents', documentRouter)
app.use('/api/chat', chatRouter)

app.use((error, req, res, next) => {
  console.error(error)
  const response = new ApiResponse(
    error.statuscode || 500,
    null,
    error.message || 'Internal Server error'
  )
  res.status(response.statuscode).json(response)
})

connectDB()
  .then(() => {})
  .catch((error) => {
    throw new ApiError(500,"Database connection error",error);
  })

app.listen(process.env.PORT, () => {
  logger.info(`Server running at http://localhost:${process.env.PORT}`)
})
