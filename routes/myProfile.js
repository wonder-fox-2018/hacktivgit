const router = require('express').Router();
var request = require('request');
require('dotenv').config()

router.get('/', (req, res) => {
    request({
        method:'GET',
        url: `https://api.github.com/user`,
        headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.ACCESS_TOKEN}`
        },
        json: true
    }, (err, incomingMessage, response) => {
        console.log(response);
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }  else {
            res.status(200).json(response);
        }
    });
});

router.get('/starred', (req, res) => {
    request({
        method:'GET',
        url: `https://api.github.com/user/starred`,
        headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.ACCESS_TOKEN}`
        },
        json: true
    }, (err, incomingMessage, response) => {
        if (err) {
            
            res.status(500).json(err);
        }  else {
            if (req.query.repo) {
                let notFound = true;
                response.forEach(repo => {
                    if (repo.name === req.query.repo) {
                        res.status(200).json(repo);
                        isFound = false;
                    }

                    if (notFound) {
                        res.status(404).send('repo not found');
                    }
                });
            } else {
                res.status(200).json(response);
            }              
        }
    });
});


router.post('/create-repo', (req, res) => {
    request({
        method: 'POST',
        url: `https://api.github.com/user/repos`,
        headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.ACCESS_TOKEN}`
        },
        json: true,
        body: {
            name: req.body.name,
            description: req.body.description,
            homepage: req.body.homepage
        }
    }, (err, incomingMessage, response) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(response);
        }   
    });
});

router.delete('/unstar', (req, res) => {
    request({
        method: 'DELETE',
        url: `https://api.github.com/user/starred/${req.body.username}/${req.body.repo}`,
        headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.ACCESS_TOKEN}`
        },
        json: true
    }, (err, incomingMessage, response) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(response);
        }
    })
}) 











module.exports = router;