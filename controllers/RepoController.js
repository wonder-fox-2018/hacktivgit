'use strict'

const request = require('request')

class RepoController{

    // get list of starred repo
    static getListOfRepo(req,res){
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
}

module.exports = RepoController