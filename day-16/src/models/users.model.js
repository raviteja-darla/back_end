const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is already exist."],
        required: [true, "username is required."]
    }, 
    email: {
        type: String,
        unique: [true, "email is already exist."],
        required: [true, "email is required."]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }, 
    bio: {
        type: String, 
        default: " "
    }, 
    profile_img: {
        type: String,
        default: "https://ik.imagekit.io/jaur4d3nx/defaultImage.png?updatedAt=1771342318243"
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;