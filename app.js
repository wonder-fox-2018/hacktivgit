var createError = require('http-errors');
var express = require('express');
const port=process.env.PORT || 3000;
var request = require('request')
require('dotenv').config();
const indexRouter=require('./routes/index')
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.get('/login/callback',function(req,res){
    
    request(
        { method: 'POST', 
          url: 'https://github.com/login/oauth/access_token',
          json:true,
          headers: {
            'User-Agent': 'request'
          },
          body:{
            client_id:process.env.client_id,
            client_secret:process.env.client_secret,
            code:req.query.code
            }
          
        },
         function (error,IncomingMessage, response) {
          if(error){
            console.log(err)
          } else {
            res.json({response:response, IncomingMessage:IncomingMessage});
          }
        }
      )
     

})
app.get('/me',function(req,res){
    request(
        {
          method: 'GET', 
          url:`https://api.github.com/user?access_token=${process.env.access_token}`,
          json:true,
          headers: {
            'User-Agent': 'request'
          }        
        },
         function (error,IncomingMessage, response) {
          if(error){
            console.log(err)
          } else {
            res.json(response);
          }
        }
      )
})


app.listen(port,function(){
  console.log(`Listening to port:` + port)
});


module.exports = app;
