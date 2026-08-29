const { Router } = require("express");
const validateUser = require("express-validator");
const movieController = require("../controllers/movieController");
const { movieRules } = require("../middleware/movieValidator");
const { normalizeGenres } = require("../middleware/normaliseGenre");

const movieRouter = Router();

movieRouter.get("/new", movieController.getCreateForm);
movieRouter.post("/new", movieRules, movieController.postCreateForm);
movieRouter.get("/:id/edit", movieController.getEditForm);
movieRouter.post("/:id/edit", normalizeGenres, movieRules, movieController.postEditForm);
movieRouter.get("/:id", movieController.getMovieDetails);


module.exports = { movieRouter } ;