var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/user', userRouter)




module.exports = app;
