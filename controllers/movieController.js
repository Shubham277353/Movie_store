const db = require("../db/queries");

async function getAllMovies(req, res) {
    const allMovies = await db.allMovies();
    // console.log("All movies: ", allMovies);
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

async function getCreateForm(req, res){
    const genres = await db.getGenres();
    const directors = await db.getDirectors();

    res.render("moviesForm", {title: "Create Movie", mode: "create", movie: {}, directors: directors, genres: genres});
}

async function postCreateForm(req, res) {
    const movieId = await db.addMovie(req.body);

    const genres = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres];

    console.log("movieId:", movieId);
console.log("genres:", req.body.genres);

    db.addGenres(genres, movieId);

    res.redirect("/");
    
}

async function getEditForm(req, res){
    const movieDetails = await db.getMovieInfo(req.params.id);
    const genres = await db.getGenres();
    const directors = await db.getDirectors();

    if(!movieDetails){
        return res.status(404).json({error: "Movie not found"});
    }

    res.render("moviesForm", {title: "Edit Movie", mode: "edit", movie: movieDetails, directors: directors, genres: genres});

    // res.redirect(`/movies/${req.params.id}`);
}

module.exports = {
    getAllMovies,
    getMovieDetails,
    getCreateForm,
    postCreateForm,
    getEditForm,
}