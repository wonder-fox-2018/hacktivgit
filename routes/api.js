var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController.js')
const repoController = require('../controllers/repoController.js')

// router
// .get(`/login/oaunth/authorize`, apiController.authorize)

router
    .get("/auth/github", repoController.login)
    .get("/login/oaunth/authorize",repoController.callback)

    .get('/info',repoController.info)

    .post('/repo',repoController.crateRepo)

    .get('/repo/starred',repoController.getStarred)
    .post('/repo/unstar',repoController.unstar)
    .post('/repo/star',repoController.star)

    .post('/search', repoController.searchRepoByUsername)
    .get('/search',repoController.searchRepo)

module.exports = router;
