'use strict'

const express = require('express')
const router = express.Router()
const RepoController = require('../controllers/RepoController')

router.get('/lists', (req,res) =>{
    RepoController.getListOfRepo(req,res)
})

module.exports = router