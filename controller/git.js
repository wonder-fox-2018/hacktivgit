const request = require('request')

class Controller {
    static gettingToken(req, res) {
        request.post({ 
            url: `https://github.com/login/oauth/access_token`,
            json: true,
            headers: {
                'User-Agent': 'request'
            },
            body: {
                client_id: process.env.SECRET_CLIENT_ID,
                client_secret: process.env.SECRET_CLIENT_SECRET,
                code: req.query.code,
                scope: 'repo'
            }
        }, 
        function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                process.env.SECRET_TOKEN = body.access_token
                res.status(200).redirect('/user')
            }
        })
    }

    static tokenAccepted(req, res) {
        request.get({
            url: `https://api.github.com/user?access_token=${process.env.SECRET_TOKEN}`,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
          },
          function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    data: body
                })
            }
        })
    }

    static showAllStarredRepo(req, res) {
        const options = {
            url: `https://api.github.com/user/starred`,
            method: 'GET',
            json: true,
            headers: {
                'User-Agent': 'request',
                Authorization: `token ${process.env.SECRET_TOKEN}`
            }
          }
        
        request(options, function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    //   response: response,
                    data: body
                })
            }
        })
    }

    static filterSearchRepo(req,res) {
        const options = {
            url: `https://api.github.com/user/starred`,
            method: 'GET',
            json: true,
            headers: {
                'User-Agent': 'request',
                Authorization: `token ${process.env.SECRET_TOKEN}`
            }
        }

        request(options, function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                let filteredData = []
                for (let i = 0; i < body.length; i++) {
                    if (body[i].owner.login === req.body.username) {
                        filteredData.push(body[i])
                    }
                }
                console.log(filteredData);
                
                res.status(200).json({
                  data: filteredData
                })
            }
        })
    }

    static createRepo(req, res) {
        const options = {
            url: `https://api.github.com/user/repos`,
            method: 'POST',
            json: true,
            headers: {
                'User-Agent': 'request',
                Authorization: `token ${process.env.SECRET_TOKEN}`
            },
            body: {
                name: req.body.name,
                description: req.body.description
            }
          }
        
        request(options, function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                    response: response,
                    data: body
                })
            }
        })
    }

    static searchAllRepo(req, res) {
        const options = {
            url: `https://api.github.com/users/${req.body.username}/repos`,
            method: 'GET',
            json: true,
            headers: {
                'User-Agent': 'request',
                Authorization: `token ${process.env.SECRET_TOKEN}`
            }
        }

        request(options, function(err, response, body) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            }
            else {
                res.status(200).json({
                  data: body
                })
            }
        })
    }
    
}

module.exports = Controller