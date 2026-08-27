const Router = require("express");
const validateUser = require("express-validator");
const directorController = require("../controllers/directorController");

const directorRouter = Router();

directorRouter.get("/", directorController.getAllDirectors);

module.exports = { directorRouter } ;