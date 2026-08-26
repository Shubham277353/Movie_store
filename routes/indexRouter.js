const Router = require("express");
const validateUser = require("express-validator");
const movieController = require("../controllers/movieController");

const indexRouter = Router();


indexRouter.get("/", movieController.getAllMovies);

