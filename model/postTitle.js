const mongoose = require("mongoose")

const Schema = mongoose.Schema

const postSchema = new Schema({
    user_id: {

    },
    title: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Post = mongoose.model("PostTitle", postSchema)

module.exports = Post