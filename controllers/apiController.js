const request = require('request')


module.exports = {

    authorize : (req,res)=>{
        req.headers['user-agent'] = 'request'

        request({
            url : 'https://github.com/login/oauth/access_token',
            method : 'post',
            json : true,
            body : {
                client_id : process.env.client_id,
                client_secret : process.env.client_secret,
                code : req.query.code
            }
        },(err,incomingMsg, response)=>{
            request({
                url : `https://api.github.com/user?access_token=${response.access_token}`,
                method : 'get',
                json : true,
                headers : {
                    'user-agent' : 'request'
                }
            },(err,incomingMsg, response2)=>{
                console.log(response2)
                res.status(200).json({
                    token : response2 
                })
            })
        })
    }


}