// Importing mogoose to connect DataBase server;
const mongoose = require("mongoose");

// Creating function to connect Database server;
function connectDB () {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Successfully connected Database server");
    })
}

module.exports = connectDB;