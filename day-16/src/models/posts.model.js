const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required"]
    },
    caption: {
        type: String,
        default: " "
    },
    image: {
        type: String,
        required: [true, "ImgURL required to create a post"]
    }
});

const postsModel = mongoose.model("posts", postsSchema);

module.exports = postsModel;