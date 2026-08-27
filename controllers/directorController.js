const db = require("../db/queries");

async function getAllDirectors(req, res) {
    const allDirectors = await db.getDirectors();
    res.render("directors", {directors: allDirectors});
}

module.exports = {getAllDirectors};