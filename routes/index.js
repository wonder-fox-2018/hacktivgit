require('dotenv').config();

const router = require('express').Router();
const request = require('request');
const star = require('./star.js');
const repo = require('./repo.js');

router.get('/hacktivgit', function(req, res) {
    request({
        url: `https://api.github.com/user?access_token=${process.env.ACCESS_TOKEN}`,
        method: 'GET',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }, function(error, incomingMessage, response) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(response);
        }
    });
});

router.use('/starred', star);
router.use('/repos', repo);

module.exports = router;

