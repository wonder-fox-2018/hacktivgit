const request = require('request')
const { listRepoStarred } = require('../helpers')

module.exports = {

  githubCallback(req, res) {

    request({
      url: 'https://github.com/login/oauth/access_token',
      method: 'post',
      json: true,
      body: {
        'client_id': process.env.CLIENT_ID,
        'client_secret': process.env.CLIENT_SECRET,
        'code': req.query.code
      }}
    , function (error, response) {
      if(!error){
        res.status(200).json({
          token: response.body.access_token
        })
      }
    })

  },

  staring(req, res) {
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.TOKEN_GIT
      }
    };

    function callback(error, response, body) {
      let data = listRepoStarred(JSON.parse(body))
      if (!error) {
        res.status(200).json({
          message: `List repository got star`,
          data
        })
      } else {
        res.status(500).json({
          message: error
        })
      }
    }

    request(options, callback)
  },

  stared(req, res) {

    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + process.env.TOKEN_GIT
      }
    };

    function callback(error, response, body) {
      if (!error) {
        res.status(200).json({
          message: `List starring repository`,
          data: JSON.parse(body)
        })
      } else {
        res.status(500).json({
          message: error
        })
      }
    }

    request(options, callback)

  },

  createRepo(req,res) {

    request({
      url: 'https://api.github.com/user/repos',
      method: 'post',
      headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + process.env.TOKEN_GIT
      },
      body : JSON.stringify({
          "name" : req.body.name
      })
    }, function(error, message, response){
      if(!error){
        res.status(201).json({
          message: `create repository success`, 
          data: JSON.parse(response)
        })
      } else (
        res.status(500).json({
          error
        })
      )
    })
  },

  searchrepo(req,res) {
    request({
      url: `https://api.github.com/search/repositories?q="${req.query.name}"`,
      headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + process.env.TOKEN_GIT
      }
    }, function(error, message, response){
      if(!error){
        res.status(201).json({
          message: `create repository success`, 
          data: JSON.parse(response)
        })
      } else (
        res.status(500).json({
          error
        })
      )
    })
  },

  searchRepoByUsername(req,res) {
    request({
      url: `https://api.github.com/users/${req.query.username}/repos`,
      headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + process.env.TOKEN_GIT
      }
    }, function(error, message, response){
      if(!error){
        res.status(201).json({
          data: JSON.parse(response)
        })
      } else (
        res.status(500).json({
          error
        })
      )
    })
  },

  unstarRepo(req,res) {    
    request({
      url: `https://api.github.com/user/starred/${req.query.owner}/${req.query.repo}`,
      method: 'DELETE',
      headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + process.env.TOKEN_GIT
      }
    }, function(error, message, response){
      if(!error){
        res.status(201).json({
          message
        })
      } else (
        res.status(500).json({
          error
        })
      )
    })
  }

}