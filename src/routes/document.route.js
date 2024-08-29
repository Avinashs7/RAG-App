const upload = require('../middlewares/multer.middleware.js')
const { Router } = require('express')
const router = Router()
const { handleDocumentUpload } = require('../controller/document.controller.js')

router.route('/process').post(upload.single('file'), handleDocumentUpload)

module.exports = router
