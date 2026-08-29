const { body } = require("express-validator");
const { validateRequest } = require("./validateRequest");

const movieRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),

  body("releaseDate")
    .isInt({ min: 1888, max: new Date().getFullYear() + 5 })
    .withMessage("Please enter a valid release year"),

  body("director").isInt().withMessage("Director ID must be an integer"),

  body("imageUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Image url must be a valid web link"),

  body("genres")
    .isArray({ min: 1 })
    .withMessage("Genres must be a valid array with atleast one value"),

  body("genres.*").isInt().withMessage("Each genre ID must be an integer"),

  validateRequest,
];

module.exports = { movieRules };
