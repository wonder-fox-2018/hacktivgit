'use strict'

const express = require('express')
const router = express.Router()
const RepoController = require('../controllers/RepoController')

// get list of starred repo
router.get('/lists', (req,res) =>{
    RepoController.getListOfStarredRepo(req,res)
})

// get repository by username
router.post('/username', (req,res) =>{
    RepoController.getRepositoryByUsername(req,res)
})

// create repository
router.post('/', (req,res) =>{

})

module.exports = router