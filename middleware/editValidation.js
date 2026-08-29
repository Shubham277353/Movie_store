const {body} = require("express-validator");

const editValidation = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Admin password is required")
];

module.exports =  {editValidation };