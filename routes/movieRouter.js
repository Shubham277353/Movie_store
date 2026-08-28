const Router = require("express");
const validateUser = require("express-validator");
const movieController = require("../controllers/movieController");

const movieRouter = Router();

movieRouter.get("/new", movieController.getCreateForm);
// movieRouter.post("/new", movieController);
movieRouter.get("/:id", movieController.getMovieDetails);


module.exports = { movieRouter } ;