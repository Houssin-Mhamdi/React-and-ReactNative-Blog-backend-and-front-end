const { featuredPost } = require('../model/featuredPostes.js')
const { Post } = require('../model/posteModel.js')
const { cloudinaryUploadImages, cloudinaryDeleteImages } = require("../utils/cloudinary.js")
const fs = require('fs')

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
        const result = await cloudinaryUploadImages(imagePath)
        console.log(result)
        const { title, content, meta, tags, slug, author, featured } = req.body
        console.log(req.file);
        //const parsedTags = JSON.parse(tags);
        const newpost = await Post.create({
            title: title,
            content: content,
            meta: meta,
            tags: tags,
            slug: slug,
            author: author,
            thumbnail: {
                url: result.secure_url,
                publicId: result.public_id
            }

        })
        res.status(201).json(newpost)
        fs.unlinkSync(imagePath)
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

// for all users
exports.getPostsByIdCltr = async (req, res) => {
    const Singlepost = await Post.findById(req.params.id)
    res.status(200).json(Singlepost)
}

//only admin can delete
exports.deletPostsCltr = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: 'No post found' })
    }
    await Post.findByIdAndDelete(req.params.id)
    await cloudinaryDeleteImages(post.thumbnail.publicId)
    res.status(200).json({ message: 'Post has been deleted', postId: post._id })
}

//only admin can update
exports.updatePostsCltr = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        return res.status(404).json({ message: 'No post found' })
    }
    //delete old image
    await cloudinaryDeleteImages(post.thumbnail.publicId) 
    //uplode new image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`)
   
    const result = await cloudinaryUploadImages(imagePath)
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            meta: req.body.meta,
            tags: req.body.tags,
            slug: req.body.slug,
            author: req.body.author,
            thumbnail: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, { new: true })
    res.status(200).json({updatedPost})
    fs.unlinkSync(imagePath)
}