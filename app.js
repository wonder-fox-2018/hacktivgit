const express = require('express'),
      app = express(),
      bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
      usersRouter = require('./routes/users')

let port = process.env.PORT || 3000
app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

app
  .use('/', indexRouter)
  .use('/users', usersRouter)

app.listen(port, () => {
  console.log('Example app listening on port '+ port + '!')
})

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
