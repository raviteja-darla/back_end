const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Server is connected to DataBase Server...."))
}

module.exports = connectDB;