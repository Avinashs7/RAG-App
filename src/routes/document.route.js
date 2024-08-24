const upload = require('../middlewares/multer.middleware.js')
const { Router } = require('express')
const router = Router()
const {
  handleDocumentUpload,
  handleEmbedding,
  handleQuestion
} = require('../controller/document.controller.js')

router.route('/upload').post(upload.single('file'), handleDocumentUpload)

router.route('/embedding-document').get(handleEmbedding)

router.route('/question').get(handleQuestion)

module.exports=router;
