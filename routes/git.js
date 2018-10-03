const express = require('express'),
      router = express.Router()
      Controller = require('../controller/git')

router
    .get('/login/callback', Controller.gettingToken)
    .get('/user', Controller.tokenAccepted)
    .get('/user/starredRepo', Controller.showAllStarredRepo)
    .get('/user/starredRepo/search', Controller.filterSearchRepo)
    .post('/user/createRepo', Controller.createRepo)
    .get('/user/searchRepo', Controller.searchAllRepo)
    
module.exports = router