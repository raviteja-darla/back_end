const mongoose = require("mongoose");

async function connectDB () {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Data Base Successfully Connected...")
    })
}

module.exports = connectDB;