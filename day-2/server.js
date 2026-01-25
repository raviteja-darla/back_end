const express = require("express");

const app = express() // Creating a server instance.

app.get('/home', (req, res) => {res.send("This is Home Page")})
app.get('/about', (req, res) => {res.send("This is About Page")})
app.get('/contact', (req, res) => {res.send("This is Contact Page")})


app.listen(3000, () => {
    console.log("Server started on port 3000")
}) // .listen(3000) is used to start server.

