const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: [true, "user already exist with this username"],
        required: [true, "username is required"]
    }, 
    email: {
        type: String, 
        unique: [true, "user already exist with this email address"],
        required: [true, "email address is required"]
    },
    password: {
        type: String, 
        required: [true, "password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/jaur4d3nx/defaultImage.png?updatedAt=1771342318243"
    }
})

const userModel = new mongoose.model("users", userSchema);

module.exports = userModel;