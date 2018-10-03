const express = require('express'),
      router = express.Router(),
      { list, create, listrepo, star, unstar } = require('../controllers/index');

/* GET home page. */
router
    .get('/starred/:username', list)

    .post('/repo', create)

    .get('/repos/:username/:reponame', listrepo)

    .get('/unstar/:username/:reponame', unstar)

    .get('/star/:username/:reponame', star)

module.exports = router;