const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Server connected to DataBase....")
    });
};

module.exports = connectDB;