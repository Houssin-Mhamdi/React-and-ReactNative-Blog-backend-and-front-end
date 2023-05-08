const mongoose = require('mongoose');

const featuredPostSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: "Post",
        trim: true
    },
}, {
    timestamps: true,
})

const featuredPost = mongoose.model('featuredPost', featuredPostSchema)
module.exports = {
    featuredPost
}