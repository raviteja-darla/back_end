const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already token"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "Account already created with this email address"],
        required: [true, "user email is required"]
    }, 
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/jaur4d3nx/defaultImage.png?updatedAt=1771342318243"
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;