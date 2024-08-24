require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')

const documentRouter = require('./routes/document.route.js')

app.use(helmet())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use("/document", documentRouter)


app.listen(8000, () => {
  console.log('Server running at http://localhost:8000')
})
