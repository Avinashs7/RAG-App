const { CohereEmbeddings } = require('@langchain/cohere');
const { FaissStore } = require('@langchain/community/vectorstores/faiss');
const fs = require('fs');
const path = require('path');

const vectorizer = {
  embed_and_store: async function (vector_store, split_documents) {
    try {
      // Create CohereEmbeddings instance
      const embeddings = new CohereEmbeddings({
        apiKey: process.env.COHERE_API_KEY,
        model: "embed-english-v3.0"
      });
      // Load the docs into the vector store
      const vectorStore = await FaissStore.fromDocuments(split_documents, embeddings);

      // Define the base directory
      const baseDir = path.join(process.cwd(), 'vector-db', 'faiss-store');

      // Create the base directory if it doesn't exist
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true });
      }

      // Define the full directory path for this specific vector store
      const directory = path.join(baseDir, vector_store);

      // Save the vector store to the directory
      await vectorStore.save(directory);

      console.log(`Vector store saved successfully to ${directory}`);
    } catch (error) {
      console.error('Error in embed_and_store:', error);
      throw error; // Re-throw the error for the calling code to handle
    }
  }
};

module.exports = vectorizer;