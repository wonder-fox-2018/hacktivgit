const express = require('express'),
    router = express.Router(),
    { login } = require('../controllers/users');

/* GET users listing. */
router
    .get('/login', login)

module.exports = router;