require('dotenv').config()

const request = require('request')

module.exports = {

    login:(req, res) => {
        let options = {
            url: `https://github.com/login/oauth/access_token`,
            headers: {
              'User-Agent': 'request'
            },
            json: true,
            body: {
                client_id : process.env.client_id,
                client_secret : process.env.client_secret,
                code : req.query.code,
            }
        }

        request.post(options, (error, response, body) => {
            if(!error) {
                res.status(200).json({
                    message: 'succesfully created repository',
                    data: body
                })
            } else {
                res.status(500).json({
                    message: error.message
                })
            }
        })
    }
}