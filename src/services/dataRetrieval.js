const { Cohere, CohereEmbeddings } = require('@langchain/cohere')
const { ConversationalRetrievalQAChain } = require("langchain/chains")
const { FaissStore } = require('@langchain/community/vectorstores/faiss')
const { BufferMemory } = require("langchain/memory")
const path=require("path")

const retrieval_qa_chain = {
  ask_question: async function (document_id, question, chat_history = []) {
    try {
      const baseDir = path.join(process.cwd(), 'vector-db', 'faiss-store');
      const directory = path.join(baseDir, document_id)      
      const model = new Cohere({ apiKey: process.env.COHERE_API_KEY })
      
      // Load the vector store from the directory
      const loadedVectorStore = await FaissStore.load(
        directory,
        new CohereEmbeddings({ 
          apiKey: process.env.COHERE_API_KEY,
          model: "embed-english-v3.0"
        })
      )
      
      // Create the conversational retrieval chain
      const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        loadedVectorStore.asRetriever(),
        {
          memory: new BufferMemory({
            memoryKey: "chat_history",
            returnMessages: true,
            inputKey: "question",
            outputKey: "text",
          }),
          returnSourceDocuments: true,
        }
      )

      // Invoke the chain with the question
      const response = await chain.call({
        question: question,
      })

      // Update chat history
      chat_history.push(
        { type: 'human', content: question },
        { type: 'ai', content: response.text }
      )

      // Prepare and return the answer
      const answer = {
        answer: response.text,
        chat_history: chat_history,
        source: response.sourceDocuments
      }

      return answer
    } catch (error) {
      console.error('Error in ask_question:', error)
      throw error
    }
  }
}

module.exports = retrieval_qa_chain