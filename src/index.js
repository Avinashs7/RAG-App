require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')



app.use(helmet())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.listen(8000, () => {
  console.log('Server running at http://localhost:8000')
})
