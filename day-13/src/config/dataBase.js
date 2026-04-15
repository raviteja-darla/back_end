const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully connected to Database Server");
    })
}

module.exports = connectDB;