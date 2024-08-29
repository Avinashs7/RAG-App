const retrieval_qa_chain = require('../services/dataRetrieval.js')
const ChatThread = require('../models/chatThread.js')
const asyncHandler = require('../utils/AsyncHandler.js')
const ApiResponse = require('../utils/ApiResponse.js')
const ApiError = require('../utils/ApiError.js')
const Chat = require('../models/chat.js')

const getNameForChat = async (assetId) => {
  const answer = await retrieval_qa_chain.ask_question(
    assetId,
    'Chat Title for this document querying in not more than 10 words',
    []
  )
  return answer?.answer
}

const handleQuery = asyncHandler(async (req, res) => {
  try {
    const chatThreadId = req.query.chatThreadId
    const chatThread = await ChatThread.findById(chatThreadId).select('assetId')
    const assetId = chatThread.assetId

    const answer = await retrieval_qa_chain.ask_question(
      assetId,
      req.query.query,
      []
    )
    const answerForQuery = answer?.answer

    const data = await Chat.create({
      query: req.query.query,
      response: answerForQuery,
      chatThreadId: chatThreadId
    })

    if (!data) {
      throw new ApiError(400, 'Error occured in the creation of chat')
    }

    return res
      .status(200)
      .send(new ApiResponse((data = answer), (message = 'success')))
  } catch (error) {
    return new ApiError(400, 'Error occured while querying')
  }
})

const handleChat = asyncHandler(async (req, res) => {
  try {
    const { assetId } = req.query
    const title = await getNameForChat(assetId)
    const chatThread = await ChatThread.create({
      title: title,
      assetId: assetId
    })

    if (!chatThread) {
      throw new ApiError(400, 'error occured in the creation of chat thread')
    }

    return res
      .status(200)
      .send(
        new ApiResponse(
          (data = { chatThread: chatThread._id }),
          (message = 'Created new chat')
        )
      )
  } catch (error) {
    return new ApiError(400, 'Error in initiating chat')
  }
})

module.exports = { handleQuery, handleChat }
