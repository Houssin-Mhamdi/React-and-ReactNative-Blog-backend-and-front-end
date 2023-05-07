const express = require('express');
const router = express.Router();

const { createPostCrtl } = require('../controllers/postCltr.js');
const photoUpload = require('../middlewares/photoUpload.js');

router.post('/create',photoUpload.single('thumbnail'),createPostCrtl)

module.exports = router