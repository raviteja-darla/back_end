const express = require("express");
const app = express(); // This line creates the Server on name of App.
app.listen(3000); // This Server run's on port localhost:3000.

app.get("/", (req, res) => {
    res.send("Server is running successfully 🚀");
});

// Start server
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});