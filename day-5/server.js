// Importing Server from app.js
const app = require('./src/app');

// Server runing port on 3000
app.listen(3000, () => {
    console.log("Server running on Port 3000.!!!");
})