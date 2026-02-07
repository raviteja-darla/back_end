const mongoose = require("mongoose");

const connect_database = require("./src/config/database");

const app = require("./src/app");

connect_database();

app.listen(3000, () => {
    console.log("Server running on port 3000");
})