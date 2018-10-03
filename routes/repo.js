require('dotenv').config();

const repo = require('express').Router();
const request = require('request');

repo.post('/create', function(req, res) {
    request({
        url: 'https://api.github.com/user/repos',
        method: 'POST',
        json: true,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.ACCESS_TOKEN}`
        },
        body: {
            name: req.body.name,
            description: req.body.description
        }
    }, function(error, incomingMessage, response) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(response);
        }
    });
});

repo.get('/:username', function(req, res) {
    request({
        url: `https://api.github.com/users/${req.params.username}/repos`,
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

module.exports = repo;