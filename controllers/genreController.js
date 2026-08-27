const db = require("../db/queries");

async function getAllGenres(req, res) {
    const allGenres = await db.getGenres();

    res.render("genre", {genres: allGenres});
}



async function getMovies(req, res ){
    const fetchedMovies = await db.getGenreMovies(req.params.id);
        if(!fetchedMovies){
        return res.status(404).json({error: "Genre not found"});
    }
    console.log(fetchedMovies[0].genre);
    const heading = `${fetchedMovies[0].genre} movies`;

    res.render("home", {title: heading, heading: heading,backUrl: "/genres", backText: "Back to genres", movies: fetchedMovies});
}

module.exports = {
    getAllGenres,
    getMovies,
};