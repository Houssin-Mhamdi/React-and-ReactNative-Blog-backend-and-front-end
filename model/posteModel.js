const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true,
        trim: true
    },
    content: {
        type: String,
        //required: true,
        trim: true
    },
    meta: {
        type: String,
        //required: true,
        trim: true
    },
    tags: [String],
    author: {
        type: String,
        default: 'User'
    },
    slug: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: Object,
        url: {
            type: URL
        },
        public_id: {
            type: String
        }
    },
}, {
    timestamps: true,
})

const Post = mongoose.model('Post', PostSchema)
module.exports = {
    Post
}