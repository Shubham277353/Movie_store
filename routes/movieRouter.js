const Router = require("express");
const validateUser = require("express-validator");
const movieController = require("../controllers/movieController");

const movieRouter = Router();




module.exports = { movieRouter } ;