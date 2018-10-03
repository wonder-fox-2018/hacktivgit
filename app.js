require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const router = require('./routes/index.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/login', function(req, res) {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=repo`);
});

app.get('/login/callback', function(req, res) {
    request({
        url: 'https://github.com/login/oauth/access_token',
        method: 'POST',
        json: true,
        body: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.query.code
        },
        headers: {
            'User-Agent': 'request'
        }
    }, function(error, incomingMessage, response) {
        if (error) {
            res.json(error);
        } else {
            res.json(response);
        }
    });
});

app.use('/hacktivgit', router);

app.listen(port, function() {
    console.log('Listening on port', port);
});