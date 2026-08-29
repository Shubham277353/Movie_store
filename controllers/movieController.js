const db = require("../db/queries");

async function getAllMovies(req, res) {
  const allMovies = await db.allMovies();
  // console.log("All movies: ", allMovies);
  res.render("home", {
    title: "Home",
    heading: "All Movies",
    movies: allMovies,
    backUrl: null,
    backText: null,
  });
}

async function getMovieDetails(req, res) {
  console.log(req.params.id);
  const movieDetails = await db.getMovieInfo(req.params.id);
  console.dir(movieDetails, { depth: null });

  if (!movieDetails) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.render("movieDetails", { info: movieDetails, error: null });
}

async function getCreateForm(req, res) {
  const genres = await db.getGenres();
  const directors = await db.getDirectors();

  res.render("moviesForm", {
    title: "Create Movie",
    mode: "create",
    movie: {},
    directors: directors,
    genres: genres,
    error: null,
  });
}

async function postCreateForm(req, res) {
  const movieId = await db.addMovie(req.body);

  const genres = Array.isArray(req.body.genres)
    ? req.body.genres
    : [req.body.genres];

  console.log("movieId:", movieId);
  console.log("genres:", genres);

  db.addGenres(genres, movieId);

  res.redirect("/");
}

async function getEditForm(req, res) {
  const movieDetails = await db.getMovieInfo(req.params.id);
  const genres = await db.getGenres();
  const directors = await db.getDirectors();

  if (!movieDetails) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.render("moviesForm", {
    title: "Edit Movie",
    mode: "edit",
    movie: movieDetails,
    directors: directors,
    genres: genres,
    error: null,
  });
}

async function postEditForm(req, res) {
  if (req.adminError) {
    const movieDetails = await db.getMovieInfo(req.params.id);
    const genres = await db.getGenres();
    const directors = await db.getDirectors();

    return res.status(403).render("moviesForm", {
      title: "Edit Movie",
      mode: "edit",
      movie: movieDetails,
      genres: genres,
      directors: directors,
      error: req.adminError,
    });
  }
  const genres = req.body.genres;

  await db.updateMovie(req.params.id, req.body, genres);

  res.redirect(`/movies/${req.params.id}`);
}

async function postDeleteMovie(req, res) {
    if(req.adminError){
        const movie = await db.getMovieInfo(req.params.id);
        
        return res.status(403).render("movieDetails", {
            info: movie,
            error: "Incorrect admin password."
        });
    }
    await db.deleteMovie(req.params.id);

    res.redirect("/");
    
}

module.exports = {
  getAllMovies,
  getMovieDetails,
  getCreateForm,
  postCreateForm,
  getEditForm,
  postEditForm,
  postDeleteMovie
};
