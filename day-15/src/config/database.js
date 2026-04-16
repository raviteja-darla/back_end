const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully server connected to database.....")
    })
}

module.exports = connectDB;