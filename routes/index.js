const router = require('express').Router()
const routerGithub = require('./github')

router.use('/github', routerGithub)

module.exports = router