const mongoose = require('mongoose')

const chatThreadSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const ChatThread = mongoose.model('ChatThread', chatThreadSchema)

module.exports = ChatThread
