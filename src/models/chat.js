const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    chatThreadId: {
      type: mongoose.Types.ObjectId,
      ref: 'ChatThread'
    }
  },
  {
    timestamps: true
  }
)

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
