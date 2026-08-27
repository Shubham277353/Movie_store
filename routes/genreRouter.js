const Router = require("express");
const validateUser = require("express-validator");
const genreController = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/", genreController.getAllGenres);

genreRouter.get("/:id",genreController.getMovies);

module.exports = { genreRouter } ;