const { Post } = require('../model/posteModel.js')
exports.createPostCrtl = async (req, res) => {
    const newpost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        meta: req.body.meta
    })
    res.status(201).json(newpost)
}

//5.send response to the client