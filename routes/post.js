const express = require('express');
const router = express.Router();

const { createPostCrtl } = require('../controllers/postCltr.js')

router.post('/create', createPostCrtl)

module.exports = router