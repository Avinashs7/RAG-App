const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')

const doc_splitter = {
  //Split the document into chunks
  split_documents: async function (documents) {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100
    })

    const docOutput = await splitter.splitDocuments(documents)

    return docOutput
  }
}

module.exports = doc_splitter
