const express = require('express')
const app     = express()
const routes  = require('./routes')
require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended : false }))
app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
  console.log('listening on port ', port)
})