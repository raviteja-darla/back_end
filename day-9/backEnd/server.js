require("dotenv").config();

const app = require("./src/app");

const connectToDataBase = require("./src/config/dataBase");

connectToDataBase();

app.listen(3000, () => {
    console.log("Server running on port 3000...!");
    
});