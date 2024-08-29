const { CohereEmbeddings } = require('@langchain/cohere')
const { FaissStore } = require('@langchain/community/vectorstores/faiss')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const ApiError = require('../utils/ApiError')

const vectorizer = {
  embed_and_store: async function (split_documents) {
    try {
      // Create CohereEmbeddings instance to embed the document
      const embeddings = new CohereEmbeddings({
        apiKey: process.env.COHERE_API_KEY,
        model: 'embed-english-v3.0'
      })

      // Load the docs into the vector store provided by FaissStore
      const vectorStore = await FaissStore.fromDocuments(
        split_documents,
        embeddings
      )

      const baseDir = path.join(process.cwd(), 'vector-db', 'faiss-store')

      // Create the directory if it doesn't exist to store in the file structure

      //TODO : Have to use vector database for efficient storage
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true })
      }

      //store the embeddings in a unique named file using uuidv4 for name synthesis
      const assetId = uuidv4()
      const directory = path.join(baseDir, assetId)

      await vectorStore.save(directory)
      
      //Return the unique id for future access purpose
      return assetId

    } 
    catch (error) {
      console.error('Error in embed_and_store:', error)
      throw new ApiError(505,'Error occured while embedding and store in file structure',error)
    }
  }
}

module.exports = vectorizer;
