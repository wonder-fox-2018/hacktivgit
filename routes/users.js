var express = require('express');
var router = express.Router();
const request = require('request')

/* GET users listing. */
router.get('/starred-repos', function(req, res) {
  request({
    uri: 'https://api.github.com/user/starred',
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization' : `token ${process.env.access_token}`
    }
  },(error, incomingMessage, response)=>{
    if (error) console.log(error);
    else {
      let repos = JSON.parse(response)
      res.status(200).json(repos)
    }
  })
});

router.post('/starred-repos', function(req, res) {
  request({
    uri: `https://api.github.com/user/starred`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization' : `token ${process.env.access_token}`
    }
  }, (error, incomingMessage, response)=>{
    if (error) console.log(error);
    else {
      let repos = JSON.parse(response)
      let arr = []
      for (let i =0; i<repos.length; i++) {
        if ( (repos[i].name).search(req.body.search) !== -1 ) {
          arr.push(repos[i])
        }
      }
      res.status(200).json(arr)
    }
  })
})

router.post('/repo-add', function(req, res) {
  // const repoName = req.body.name
  // res.send(process.env.access_token);
  request({
    uri: `https://api.github.com/user/repos`,
    method: 'POST',
    headers: {
      'User-Agent': 'request',
      'Authorization' : `Bearer ${process.env.access_token}`
    },
    body: JSON.stringify({
      'name': req.body.name,
      'description': req.body.description
    })
  }, (error, incomingMessage, response)=>{
    if (error) console.log(error);
    else {
      let repo = JSON.parse(response)
      console.log('SUKSESS ',response)
      res.status(200).json(repo)
    }
  })
})

router.post('/find-repos', (req, res)=>{
  request({
    uri: `https://api.github.com/users/${req.body.username}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization' : `Bearer ${process.env.access_token}`
    }
  }, (error, incomingMessage, response)=>{
      if (error) console.log(error);
      else {
        let repo = JSON.parse(response)
        console.log('SUKSESS ',response)
        res.status(200).json(repo)
      }
  })
})

router.post('/repo-delete', (req, res)=>{
  request({
    uri: `https://api.github.com/user/starred/${req.body.username}/${req.body.repository}`,
    method: 'DELETE',
    headers: {
      'User-Agent': 'request',
      'Authorization' : `Bearer ${process.env.access_token}`
    }
  }, (error, incomingMessage, response)=>{
    if (error) console.log(error);
    else {
      // let repo = JSON.parse(response)
      console.log('SUKSESS ',response)
      // res.status(204).json(repo)
    }
  })
})

module.exports = router;
