'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const CallbackGitRouter = require('./routes/CallbackGitRouter')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use('/callbackgit' , CallbackGitRouter)

app.get('/', (req, res) =>{
    res.send('OK')
})

app.listen(process.env.PORT || 3000 , () =>{
    console.log('You are listening to PORT ',process.env.PORT)
})