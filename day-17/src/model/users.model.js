const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: [true, "username already existed"],
        required: [true, "username is required to create account."]
    },
    email: {
        type: String,
        unique: [true, "email address already existed"],
        required: [true, "email address is required to create account."]
    },
    password: {
        type: String,
        required: [true, "password is required to create account."]
    }, 
    bio: {
        type: String,
        default: " "
    },
    profile_image: {
        type: String,
        required: "https://ik.imagekit.io/jaur4d3nx/defaultImage.png?updatedAt=1771342318243"
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
