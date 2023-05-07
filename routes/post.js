const express = require('express');
const router = express.Router();

const { createPostCrtl, postCountCltr,getAllPostsCltr,getPostsByIdCltr } = require('../controllers/postCltr.js');
const photoUpload = require('../middlewares/photoUpload.js');

router.route('/').get(getAllPostsCltr)
router.post('/create', photoUpload.single('thumbnail'), createPostCrtl)
router.route('/count').get(postCountCltr)
router.route('/:id').get(getPostsByIdCltr)
module.exports = router