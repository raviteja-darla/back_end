const mongoose = require("mongoose");

function connectDataBase() {
    mongoose.connect(process.env.MONOG_URI)
    .then(() => {
        console.log("Connected To DataBase...")
    });
};

module.exports = connectDataBase;