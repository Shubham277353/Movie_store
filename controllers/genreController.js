const db = require("../db/queries");

async function getAllGenres(req, res) {
    const allGenres = await db.getGenres();
    res.render("genre", {genres: allGenres});
}

module.exports = {getAllGenres};