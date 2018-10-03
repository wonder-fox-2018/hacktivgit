var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios')
var request = require('request')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hacktivgitRouter = require('./routes/hacktivgit');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hacktivgit',hacktivgitRouter);
app.use('/users', usersRouter);



app.get('/login/callback',(req,res)=>{
  const requestToken = req.query.code
  request(
    {
        url : `https://github.com/login/oauth/access_token?client_id=${process.env.clientID}&client_secret=${process.env.clientSecret}&code=${requestToken}`,
        json : true,
        headers : {
            "User-Agent" : "request"
        }
    },
    function (error, response, body) {
      // console.log(body)
      if(error){
        res.json({
          message : 'error getting access token'
        })
      }
      const accessToken = body.access_token
      res.json(accessToken)
    }
  );
})

// app.get('/login/callback', (req, res) => {
  
//   const requestToken = req.query.code

//   axios({
    
//     method: 'post',

//     url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    
//     headers: {
//         accept: 'application/json'
//     }
//   }).then((response) => {
//     // console.log(response)
//     const accessToken = response.data.access_token
    
//     res.json(accessToken)
//   })
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // json the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
