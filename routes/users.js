const router = require('express').Router();
const { login } = require('../controllers/users.js')

router.get('/', login )

module.exports = router