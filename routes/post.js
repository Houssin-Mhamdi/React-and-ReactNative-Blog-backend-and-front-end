const express = require('express');
const router = express.Router();

const { createPostCrtl, postCountCltr, getAllPostsCltr, getPostsByIdCltr, deletPostsCltr, updatePostsCltr } = require('../controllers/postCltr.js');
const photoUpload = require('../middlewares/photoUpload.js');
const { parsData } = require('../middlewares/parsData.js');

router.route('/').get(getAllPostsCltr)
router.post('/create', photoUpload.single('thumbnail'), parsData, createPostCrtl)
router.route('/count').get(postCountCltr)
router.route('/:id').get(getPostsByIdCltr).delete(deletPostsCltr).put(photoUpload.single('thumbnail'), updatePostsCltr)
module.exports = router