var express = require('express');
var router = express.Router();
var request = require('request')
require('dotenv').config()

router.delete('/', function(req,res){
   //DELETE /user/starred/:owner/:repo
   console.log(req.body.username,req.body.name)
    request(
        {
          method: 'DELETE', 
          url:`https://api.github.com/user/starred/${req.body.username}/${req.body.name}`,
          json:true,
          headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.access_token}`
          }        
        },
         function (error,IncomingMessage, response) {
          if(error){
            console.log(err)
          } else {
                res.status(200).json(response);
          }
        }
      )

} );




module.exports = router;