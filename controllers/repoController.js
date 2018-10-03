var github = require('octonode')
var client = github.client(process.env.access_token);
var ghme   = client.me()

var githubOAuth = require('github-oauth')({
    githubClient: process.env.client_id,
    githubSecret: process.env.client_secret,
    baseURL: 'http://localhost:3000',
    loginURI: '/auth/github',
    callbackURI: '/login/oaunth/authorize',
    scope: 'repo'
})

githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
    serverResponse.end(JSON.stringify(token))
})

module.exports = {

    login : (req,res)=>{
        return githubOAuth.login(req, res)
    },

    callback : (req,res)=>{
        return githubOAuth.callback(req, res)
    },

    info : (req,res)=>{

        ghme.info(function(err, data, headers) {
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        });

    },

    getStarred : (req,res)=>{

        ghme.starred((err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        });

    },

    crateRepo : (req,res)=>{

        ghme.repo({
            "name": req.body.name,
            "description": req.body.description,
        }, (err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        }); 

    },

    searchRepoByUsername : (req,res)=>{

        var ghuser = client.user(req.body.username);
        ghuser.repos((err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        });

    },

    star : (req,res)=>{

        ghme.star(`${req.body.username}/${req.body.repository}`,(err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        });

    },

    unstar : (req,res)=>{

        ghme.unstar(`${req.body.username}/${req.body.repository}`,(err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        });

    },

    searchRepo : (req,res)=>{

        let ghsearch = client.search();
        ghsearch.repos({
            q: 'hub+language:go',
            sort: 'created_at',
            order: 'desc'
        }, (err,data,headers)=>{
            if(!err) res.status(200).json({data,headers})
            else res.status(500).json({err})
        }); 

    }


}