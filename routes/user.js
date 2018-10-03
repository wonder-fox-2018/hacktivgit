var express = require('express');
var router = express.Router();
var request = require('request')

router.get('/starred', (req, res) => {
    request({
        url: `https://api.github.com/user/starred`,
        method: 'get',
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.access_token}`
        }
    }, (err, incomingMsg, respon) => {
        if(err){
            console.log(err);
        } else {
            res.send(respon)
        }
    })
})

router.post('/search', (req, res) => {
    request({
        url: `https://api.github.com/user/starred`,
        method: 'get',
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.access_token}`
        }
    }, (err, incomingMsg, response) => {
        if(err){
            console.log(err);
        } else {
            let respon = JSON.parse(response)
            let result = []
            for (let i = 0; i < respon.length; i++) {
                if((respon[i].name).indexOf(req.body.search) != -1){
                    result.push(respon[i])
                }
            }
            res.json(result)
        }
    })
})

router.post('/add-repo', (req, res) => {
    request({
        url: `https://api.github.com/user/repos`,
        method: 'post',
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.access_token}`
        },
        body: JSON.stringify ({
            name: req.body.name,
            description: req.body.description
        })
    }, (err, incomingMsg, response) => {
        if(err){
            console.log(err)
        } else {
            res.json({message: "sukses add repo"})
        }
    })
})

router.post('/search-repo/:id', (req, res) => {
    request({
        url: `https://api.github.com/users/${req.params.username}/repos`,
        method: 'get',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }, (err, incomingMsg, response) => {
        if(err){
            console.log(err);
        } else {
            res.json(response)
        }
    })
})

router.post('/unstar/:owner/:repo', (req, res) => {
    request({
        url: `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`,
        method: 'delete',
        json: true,
        headers: {
            'User-Agent': 'request',
            'Authorization': `token ${process.env.access_token}`
        }
    }, (err, incomingMsg, response) => {
        if(err){
            console.log(err);
        } else {
            res.json({message: "Unstar success"})
        }
    })
})
module.exports = router;
