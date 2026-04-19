const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: [true, "Caption required to create a post"]
    }, 
    img_url: {
        type: String,
        required: [true, "Caption required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user Id is required to create a post"]
    }
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;