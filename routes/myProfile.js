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


router.get('/create-repo', (req, res) => {
    request({
        method: 'POST',
        url: `https://api.github.com/user/repos`,
        headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.ACCESS_TOKEN}`
        },
        json: true,
        body: {
            name: "Hello-World from API",
            description: "This is your first repository",
            homepage: "https://github.com",
            private: false,
            has_issues: true,
            has_projects: true,
            has_wiki: true
        }
    }, (err, incomingMessage, response) => {
        console.log(err);
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(response);
        }
    });
});

router.get('/unstar', (req, res) => {
    request({
        method: 'DELETE',
        url: `https://api.github.com/user/starred/${req.query.username}/${req.query.repo}`,
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