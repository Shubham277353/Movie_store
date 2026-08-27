const db = require("../db/queries");

async function getAllMovies(req, res) {
    const allMovies = await db.allMovies();
    console.log("All movies: ", allMovies);
    res.render("home", {movies: allMovies});
}

module.exports = {
    getAllMovies,
}