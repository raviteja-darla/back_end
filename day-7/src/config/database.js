const mongoose = require("mongoose");

function connectMongoose() {
    mongoose.connect("mongodb+srv://raviteja:huMvRmvpTCQXK6CT@cluster0.cc6k34n.mongodb.net/day-7")
    .then(() => {
        console.log("Connected to Mongoose...!");
    })
}

module.exports = connectMongoose;