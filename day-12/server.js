// Importing the dotenv package to load environment variables from a .env file into process.env, allowing us to use environment variables for configuration such as database connection strings and secret keys without hardcoding them in our code.
require("dotenv").config()

// Importing the Express application instance from the app.js file, which contains the configuration for our Express server and routes.
const app = require("./src/app");

// Importing the connectDB function from the database.js file, which is responsible for establishing a connection to the MongoDB database using Mongoose.
const connectDB = require("./src/config/database");

// Establishing a connection to the MongoDB database before starting the server. This ensures that the server only starts listening for requests after a successful connection to the database has been established.
connectDB();

// Starting the Express server and listening on port 3000 for incoming requests. Once the server is running, it logs a message to the console indicating that the server is operational and listening on the specified port.
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
