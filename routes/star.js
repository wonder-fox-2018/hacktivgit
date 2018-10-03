require('dotenv').config();

const star = require('express').Router();
const request = require('request');

star.get('/', function(req, res) {
    request({
        url: 'https://api.github.com/user/starred', 
        method: 'GET', 
        json: true,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.ACCESS_TOKEN}`
        }
    }, function(error, incomingMessage, response) {
        if (error) {
            res.status(500).json(error);
        } else {
            if (req.query.star) {
                for (let i = 0; i < response.length; i++) {
                    if (req.query.star === response[i].name) {
                        res.status(200).json(response[i]);
                        break;
                    }
                }
            } else {
                res.status(200).json(response);
            }
        }
    });
});

star.delete('/:username/:repo/delete', function(req, res) {
    request({
        url: `https://api.github.com/user/starred/${req.params.username}/${req.params.repo}`,
        method: 'DELETE',
        json: true,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.ACCESS_TOKEN}`
        }
    }, function(error, incomingMessage, response) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(response);
        }
    });
});

module.exports = star;