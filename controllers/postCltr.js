const { Post } = require('../model/posteModel.js')
exports.createPostCrtl = async (req, res) => {
    const { title, content, meta, tags, slug, author } = req.body
    console.log(req.file);
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

exports.postCountCltr = async (req, res) => {
    const postCount = await Post.count()
    res.status(200).json(postCount)
}
exports.getAllPostsCltr = async (req, res) => {
    const POST_PER_PAGE = 3
    const { PageNumber } = req.query
    let AllPsots

    if (PageNumber) {
        AllPsots = await Post.find()
            .skip((PageNumber - 1) * POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({ createdAt: -1 })
        res.status(200).json(AllPsots)
    } else {
        AllPsots = await Post.find()
            .sort({ createdAt: -1 })
        res.status(200).json(AllPsots)
    }

}
exports.getPostsByIdCltr = async (req, res) => {
    const Singlepost = await Post.findById(req.params.id)
    res.status(200).json(Singlepost)
}