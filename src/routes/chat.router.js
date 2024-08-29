const { Router } = require('express')
const router = Router()
const { handleQuery, handleChat } = require('../controller/chat.controller.js')

router.route('/start').get(handleChat)

router.route('/message').get(handleQuery)

module.exports = router
