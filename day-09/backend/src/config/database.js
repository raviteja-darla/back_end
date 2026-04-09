// Importing Mongoose to connect Database server;
const mongoose = require("mongoose");

// Creating function to connect Database server;
function connectDB () {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to DataBase Successfully...!")
    })
}

// Exporting connectDB function to use in other files;
module.exports = connectDB;
