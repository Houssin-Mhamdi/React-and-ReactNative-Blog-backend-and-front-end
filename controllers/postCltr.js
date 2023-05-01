const { Post } = require('../model/posteModel.js')
exports.createPostCrtl = async (req, res) => {
    const {title,content,meta,tags,slug,author} = req.body
    const newpost = await Post.create({
        title: title,
        content: content,
        meta: meta,
        tags: tags,
        slug: slug,
        author: author
    })
    res.status(201).json(newpost)
}

//5.send response to the client