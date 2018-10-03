const request = require('request')
const { listRepoStarred } = require('../helpers')

module.exports = {

  githubCallback(req, res) {

    request({
      url: 'https://github.com/login/oauth/access_token',
      method: 'post',
      json: true,
      body: {
        'client_id': '77e3b8abe519744e2807',
        'client_secret': '525997902796c1a258831fabcb6ab19fe99f3381',
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

  serachRepo(req,res) {
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
  }

}