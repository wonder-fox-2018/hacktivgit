var express = require('express');
var router = express.Router();
var request = require('request')
require('dotenv').config()

router.post('/', function(req,res){
    console.log(req.body.name)
    request(
        {
          method: 'POST', 
          url:`https://api.github.com/user/repos`,

        //   description: `${req.body.description}`,
        //   homepage: `${req.body.homepage}`,
          json:true,
          headers: {
            'User-Agent': 'request',
            'Authorization' : `token ${process.env.access_token}`
          },
          body:{
            scope:'repo',
            name:req.body.name
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