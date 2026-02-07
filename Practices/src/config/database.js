const mongoose = require("mongoose");

function connectMongoose() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Mongoose...!")
    });
};

module.exports = connectMongoose;