var express = require('express');
var router = express.Router();
var request = require('request')
require('dotenv').config()

router.get('/', function(req,res){

    request(
        {
          method: 'GET', 
          url:`https://api.github.com/user/starred`,
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
              
            if(req.query.name){
                for (let i = 0; i < response.length; i++) {
                    if(response[i].name.indexOf(req.query.name)!=-1){
                        res.status(200).json(response[i]);
                        break;
                    }

                }
            }
            else
                res.status(200).json(response);
          }
        }
      )

} );




module.exports = router;