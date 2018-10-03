const request = require('request')
const jwt = require('jsonwebtoken')

module.exports = {

    login: function (req, res) {
        let options = {
            url: 'https://github.com/login/oauth/access_token',
            headers: {
                'User-Agent': 'request',
            },
            json: true,
            body: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: req.query.code
            }
        }

        request.post(options, (err, response, body) => {
            if (err) {
                res.status(500).json({message: err.message})
            } else {
                let token = jwt.sign(body.access_token, process.env.JWT_KEY)
                res.status(200).json({token: token})
            }
        })
    }
}