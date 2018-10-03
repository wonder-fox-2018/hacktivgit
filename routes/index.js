var express = require('express');
var router = express.Router();
const request = require('request')

/* GET home page. */
router.get('/', (req, res)=>{
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.client_id}&scope=repo`)
  
})

router.get('/auth/callback', function(req, res) {
  // res.render('index', { title: 'Express' });
  // res.send('masuk')
  request({
    uri: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    json: true,
    body: {
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      code: req.query.code
    }
  }, (error, incomingMessage, response)=>{
    if (error) console.log(error);
    else console.log(response)
  })
});


module.exports = router;
