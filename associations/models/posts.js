const mongoose = require("mongoose");

//POST title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = 

module.exports = mongoose.model("Post", postSchema);