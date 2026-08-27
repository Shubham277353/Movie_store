const db = require("../db/queries");

async function getAllMovies(req, res) {
    const allMovies = await db.allMovies();
    console.log("All movies: ", allMovies);
    res.render("home", {title: "Home",heading: "All Movies", movies: allMovies, backUrl: null,backText: null});
}


async function getMovieDetails(req, res) {
    const movieDetails = await db.getMovieInfo(req.params.id);
    console.dir(movieDetails, { depth: null });


    if(!movieDetails){
        return res.status(404).json({error: "Movie not found"});
    }

    res.render("movieDetails", { info: movieDetails});
    
}

module.exports = {
    getAllMovies,
    getMovieDetails,
}