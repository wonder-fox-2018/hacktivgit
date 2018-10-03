var express = require('express');
var router = express.Router();

const stars= require('./stars')
const create= require('./create')
const listrepo= require('./listrepo')
const unstar= require('./unstar')

router.use('/stars',stars);
router.use('/repo',create);
router.use('/listrepo',listrepo);
router.use('/unstar',unstar);

module.exports = router;
