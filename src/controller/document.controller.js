const data_loader = require('../services/dataLoader.js')
const doc_splitter = require('../services/docSplitter.js')
const vectorizer = require('../services/vectorize.js')
const retrieval_qa_chain = require('../services/dataRetrieval.js')
const path=require("path")

const handleDocumentUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  res.json({
    message: 'File uploaded successfully',
    fileName: req.file.filename
  })
}

const handleEmbedding = async (req, res) => {
  try {
    var filePath = path.resolve('C:/code/webD/RAG-APP/public/uploads/' + req.query.document)
    const docs = await data_loader.load_documents(filePath)
    const splitted_doc = await doc_splitter.split_documents(docs)
    await vectorizer.embed_and_store(req.query.document, splitted_doc)

    res.send({ status: 'SUCCESS' })
  } catch (error) {
    res.send({
      status: 'FAILED',
      message: "I've encountered an unexpected error. :)"
    })
  }
}

const handleQuestion = async (req, res) => {
  try {
    const documentID = req.query.document

    const answer = await retrieval_qa_chain.ask_question(
      documentID,
      req.query.q,
      []
    )
    res.send(answer)
  } catch (error) {
    res.send({
      status: 'FAILED',
      answer: "Ooops, I've encountered an unexpected error. :)"
    })
  }
}

module.exports = {
  handleDocumentUpload,
  handleEmbedding,
  handleQuestion
}
