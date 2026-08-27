const Router = require("express");
const validateUser = require("express-validator");
const movieController = require("../controllers/movieController");

const movieRouter = Router();

movieRouter.get("/:id", movieController.getMovieDetails)


module.exports = { movieRouter } ;