const router = require('express').Router();
var request = require('request');
require('dotenv').config();


router.get('/', (req, res) => {
    request({
        method: 'GET',
        url: `https://api.github.com/users/${req.body.username}/repos`,
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
});

module.exports = router;