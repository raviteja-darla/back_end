// Importing Server 
const app = require("./src/app");

// Importing Mongoose Server to connect to the DataBase
const mongoose = require("mongoose");

// Creating a function to connecet to the Mongoose DataBase
function connectDB() {
    mongoose.connect("")
    .then(() => {
        console.log("Successfully connected to MongoDB Server")
    })
}

// Allowing Server to run on port 3000;
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
})