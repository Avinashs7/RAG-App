const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf')

const data_loader = {
  load_documents: async function (file_location) {

    const loader = new PDFLoader(file_location, {
      splitPages: true
    })

    const docs = await loader.load()

    return docs
  }
}

module.exports = data_loader
