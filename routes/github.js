const router = require('express').Router()
const Controller = require('../controllers/githubController')

router.get('/signin/callback', Controller.githubCallback)
router.get('/staring', Controller.staring)
router.get('/stared', Controller.stared)

module.exports = router