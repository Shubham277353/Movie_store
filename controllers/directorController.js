const db = require("../db/queries");

async function getAllDirectors(req, res) {
    const allDirectors = await db.getDirectors();
    res.render("directors", {directors: allDirectors});
}

async function getDirectorMovies(req, res) {
    const allMovies = await db.getDirectorMovies(req.params.id);

    if(!allMovies){
        return res.status(404).json({error: "No such director found"});
    }

    const heading = `${allMovies[0].name}'s Movies`;

    res.render("home", {title: heading, heading: heading, backUrl: "/directors", backText: "Back to directors", movies: allMovies});
    
}

module.exports = {
    getAllDirectors,
    getDirectorMovies,
};