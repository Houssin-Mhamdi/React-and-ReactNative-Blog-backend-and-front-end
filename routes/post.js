const router = require('express').Router();
const { createPost } = require('../controllers/postCltr.js')
router.post('/create', createPost)


module.exports = router