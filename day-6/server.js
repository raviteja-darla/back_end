// Server Start
// Connect to DataBase

const app = require("./src/app");

const mongoose = require("mongoose");
        
function con_DataBase () {
    mongoose.connect("mongodb+srv://darlaraviteja04_db_user:bG74y6QVRJUCfvJw@cluster0.syjhdpw.mongodb.net/day-6")
    .then(() => {
        console.log("Connected To MongoDB");
    })
}
con_DataBase();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})