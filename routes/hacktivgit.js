var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config()

/* GET home page. */
router.get('/', (req,res)=>{
    request(
      {
          url : `https://api.github.com/user?access_token=${process.env.TOKEN}`,
          json : true,
          headers : {
              "User-Agent" : "request"
          }
      },
      function (error, response, body) {
        //   console.log(body)
          if(error){
              res.status(400).json({
                  message : 'error getting profile data'
              })
          }else{
              res.json(body)
          }
        }  
    );
  })

router.get('/starred', (req,res)=>{
    request(
      {
          url : `https://api.github.com/user/starred`,
          json : true,
          headers : {
              "User-Agent" : "request",
              "Authorization" : `token ${process.env.TOKEN}`
          }
      },
      function (error, response, body) {
          if(error){
              res.status(400).json({
                  message : 'error getting starred data'
              })
          }else if(req.query.src){
            for(let i = 0 ; i < body.length ; i ++){
                if(body[i].name === req.query.src){
                    console.log('found',body[i])
                    res.json(body[i])
                }
            }
            
            res.status(404).json({
                message : 'failed to find'
            })
          }else{
            //   console.log(body.length)
              res.json(body)
          }  
        }  
    );
})

router.get('/repos',(req,res)=>{
    request(
        {
            url : `https://api.github.com/user/repos`,
            json : true,
            headers : {
                "User-Agent" : "request",
                "Authorization" : `token ${process.env.TOKEN}`
            }
        },
        function (error, response, body) {
            if(error){
                res.status(400).json({
                    message : 'error getting starred data'
                })
            // }else if(req.query.src){
            //     for(let i = 0 ; i < body.length ; i ++){
            //         if(body[i].name === req.query.src){
            //             console.log('found',body[i])
            //             res.json(body[i])
            //         }
            //     }
                
                // res.status(404).json({
                //     message : 'failed to find'
                // })
            }else{
                res.json(body)
            }
            
          }  
      );
})

router.get('/:username/repos',(req,res)=>{
    request(
        {
            url : `https://api.github.com/users/${req.params.username}/repos`,
            json : true,
            headers : {
                "User-Agent" : "request",
                "Authorization" : `token ${process.env.TOKEN}`
            }
        },
        function (error, response, body) {
            if(error){
                res.status(400).json({
                    message : 'error search repo'
                })
            }else{
                res.status(200).json(body)
            }
        }  
    );
})

router.post('/create-repo',(req,res)=>{
    request(
        {
            url : `https://api.github.com/user/repos`,
            method : 'POST',
            json : true,
            headers : {
                "User-Agent" : "request",
                "Authorization" : `token ${process.env.TOKEN}`
            },
            body: {
                name: req.body.name,
                description: req.body.description
                // homepage: req.body.homepage,
                // private: false,
                // has_issues: true,
                // has_projects: true,
                // has_wiki: true
            }
        },
        function (error, response, body) {
            if(error){
                res.status(400).json({
                    message : 'error create repo'
                })
            }else{
                res.status(200).json(response)
            }
        }  
    );
})

router.post('/unstar',(req,res)=>{
    // res.json(req.body)
    request(
        {
            url : `https://api.github.com/user/starred/${req.body.owner}/${req.body.repo}`,
            method : 'DELETE',
            json : true,
            headers : {
                "User-Agent" : "request",
                "Authorization" : `token ${process.env.TOKEN}`
            }
        },function(error,response,body){
            if(error){
                res.status(400).json({
                    message : `failed to unstar ${req.body.repo}`
                })
            }else{
                res.status(200).json({
                    message : `unstar ${req.body.repo} success`
                })
            }
        }
    )
})

module.exports = router