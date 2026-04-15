// Importing necessary modules
const mongoose = require("mongoose");

// Defining the user schema with fields for name, email, and password. The email field is set to be unique to prevent duplicate entries.
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "Email already exist"]
    },
    password: String,
})

// Creating a Mongoose model named "users" based on the defined user schema. This model will be used to interact with the users collection in the MongoDB database.
const userModel = mongoose.model("users", userSchema);

// Exporting the user model to be used in other parts of the application, such as in route handlers for user registration and authentication.
module.exports = userModel;