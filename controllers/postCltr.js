const { featuredPost } = require('../model/featuredPostes.js')
const { Post } = require('../model/posteModel.js')
const {cloudinaryUploadImages} = require("../utils/cloudinary.js")
const path = require('path')

const POST_PER_PAGE = 4
const addToFeaturePost = async (postId) => {
    const CreateFeaturePost = new featuredPost({ post: postId })
    await CreateFeaturePost.save()
    const featuredPosts = await featuredPost.find({}).sort({ createdAt: -1 })
    featuredPosts.forEach(async (item, index) => {
        if (index >= POST_PER_PAGE) {
            await featuredPost.findByIdAndDelete(item._id)
        }
    })
}

exports.createPostCrtl = async (req, res) => {
    try {
        const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
        
        const { title, content, meta, tags, slug, author, featured } = req.body
        console.log(req.file);
        //const parsedTags = JSON.parse(tags);
        const newpost = await Post.create({
            title: title,
            content: content,
            meta: meta,
            tags: tags,
            slug: slug,
            author: author
            
        })
        res.status(201).json(newpost)
        if (featured) await addToFeaturePost(newpost._id)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
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