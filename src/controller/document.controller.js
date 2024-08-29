const data_loader = require('../services/dataLoader.js')
const doc_splitter = require('../services/docSplitter.js')
const vectorizer = require('../services/vectorize.js')
const path = require('path')
const ApiResponse = require('../utils/ApiResponse.js')
const ApiError = require('../utils/ApiError.js')
const asyncHandler = require('../utils/AsyncHandler.js')
const fs = require('fs')

const handleDocumentUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  try {
    const assetId = await handleEmbedding(req.file.filename)

    return res
      .status(200)
      .send(
        new ApiResponse(
          (data = { assetId: assetId }),
          (message = 'File uploaded successfully')
        )
      )
  } catch (error) {
    return new ApiError(400, 'Error occured while uploading file to server')
  }
})

const handleEmbedding = async (document) => {
  try {
    var filePath = path.join(process.cwd(), 'public', 'uploads', document)
    const docs = await data_loader.load_documents(filePath)
    const splitted_doc = await doc_splitter.split_documents(docs)
    const assetId = await vectorizer.embed_and_store(splitted_doc)
    fs.unlinkSync(filePath)
    return assetId
  } catch (error) {
    throw new ApiError(400,"Error during embedding the document",error)
  }
}

module.exports = {
  handleDocumentUpload
}
