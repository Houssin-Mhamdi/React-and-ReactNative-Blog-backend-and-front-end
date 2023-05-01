const express = require('express');
const router = express.Router();

const  postCltr  = require('../controllers/postCltr.js')

router.post('/',postCltr.createCarPostCrtl)

module.exports = router