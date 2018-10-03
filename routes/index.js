var express = require('express');
var router = express.Router();
require('dotenv').config()
var request = require('request');
const myProfile = require('./myProfile');
const repo = require('./repo');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome');
});

router.get('/login', (req, res) => {
  
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=repo`); //including 2 scopes: scope=user,repo
});

router.get('/login/callback', (req, res) => {
  request({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    headers: {
      'User-Agent': 'request'
    },
    json: true,
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    }
  }, (err, incomingMessage, response) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(response.access_token);
      request({
        url: `https://api.github.com/user?access_token=${response.access_token}`,
        method: 'GET',
        json:true,
        headers: {
          'User-Agent': 'request'
        } 

      }, (err, incomingMessage, response) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(response);
        }
        
      })
    }
  });
});

router.use('/myProfile', myProfile);

router.use('/repo', repo);







module.exports = router;
