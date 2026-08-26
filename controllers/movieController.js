const db = require("../db/queries");

async function getAllMovies(req, res) {
    const allMovies = await db.getAllMovies();
    res.render("home", {movies: allMovies});
    
}

module.exports = {
    getAllMovies,
}