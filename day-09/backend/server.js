// Imponrting dotenv to use environment variables from .env file;
require("dotenv").config()

// Importing server which was created in src/app;
const app = require("./src/app");

// Importing ConnectDB;
const connectDB = require("./src/config/database")

// Connecting Database server;
connectDB();

// Starting server on port 3000;
app.listen(3000, () => {
    console.log("Server is running on Port 3000");
})

