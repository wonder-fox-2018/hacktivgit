'use strict'

const request = require('request')

class RepoController{

    // get list of starred repo
    static getListOfStarredRepo(req,res){
        request({
            url: `https://api.github.com/user/starred`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body)=>{
            if(!err){
                res.status(200).json({
                    msg: 'List of Repo',
                    data: JSON.parse(body)
                })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }

    // get repository by username
    static getRepositoryByUsername(req,res){
        request({
            url: `https://api.github.com/users/${req.body.username}/repos`,
            headers:{
                'User-Agent': 'request',
                Authorization: 'token '+process.env.GITTOKEN
            }
        },(err, response,body) =>{
            if(!err){
                res.status(200).json({
                    msg: `List of repos from ${req.body.username}`,
                    data: JSON.parse(body)
                })
            }else{
                res.status(500).json({
                    msg: 'ERROR: ',err
                })
            }
        })
    }
}

module.exports = RepoController