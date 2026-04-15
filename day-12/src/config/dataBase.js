// Importing the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Function to connect to the MongoDB database using the connection string from environment variables. It logs a success message upon successful connection.
const connectDB = () => {

    // Connecting to the MongoDB database using the connection string from environment variables. It returns a promise, and upon successful connection, it logs a success message.
    mongoose.connect(process.env.MONGO_URI)
    // Logging a success message upon successful connection to the database server.
    .then(() => {
        console.log("Sucessfully connected to DataBase Server....")
    })
}

// Exporting the connectDB function to be used in other parts of the application, such as in the server.js file where the database connection is established before starting the server.
module.exports = connectDB;