const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieName: String,
    director: String,
    actorName: String
});

const movieModel =  mongoose.model("movies", movieSchema);

module.exports = movieModel;