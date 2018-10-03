const router = require('express').Router()
const Controller = require('../controllers/githubController')

router
    .get('/signin/callback', Controller.githubCallback)
    .get('/staring', Controller.staring)
    .get('/stared', Controller.stared)
    .get('/search', Controller.searchrepo)
    .get('/searchRepoByUsername', Controller.searchRepoByUsername)
    .get('/unstarRepo', Controller.unstarRepo)
    .post('/create', Controller.createRepo)

module.exports = router