const express = require("express");

const movieModel = require("./models/movie.models");

const app = express();

app.use(express.json());

// Post Method
app.post('/movies', async (req, res) => {
    const { movieName, director, actorName } = req.body;

    const movie = await movieModel.create({
        movieName, director, actorName
    });

    res.status(201).json({
        message: "Novie created Successfully",
        movie
    })
});

// Get Method
app.get('/movies', async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.status(200).json({
            message: "Movies retrieved successfully",
            movies
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving movies",
            error: error.message
        });
    };
    
});

module.exports = app;