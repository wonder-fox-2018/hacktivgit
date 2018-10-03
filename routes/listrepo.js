var express = require('express');
var router = express.Router();
var request = require('request')
require('dotenv').config()

router.get('/:username', function(req,res){
    
    request(
        {
          method: 'GET', 
          url:`https://api.github.com/users/${req.params.username}/repos`,
          json:true,
          headers: {
            'User-Agent': 'request'
            //'Authorization' : `token ${process.env.access_token}`
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