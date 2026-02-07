require("dotenv").config()

const connect_dataBase = require("./src/config/database")

const app = require("./src/app");

connect_dataBase()

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}...!`)
})