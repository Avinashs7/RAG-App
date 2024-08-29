const { Router } = require('express')
const router = Router()
const { handleQuery, handleChat,handleChatThread } = require('../controller/chat.controller.js')

router.route('/start').get(handleChat)

router.route('/message').get(handleQuery)

router.route('/history').get(handleChatThread)
module.exports = router
