const pool = require("./pool");

async function getAllMovies() {
    const { rows } = pool.query(`SELECT movies.id, movies.title, movies.year_released AS Year From
        movies ORDER BY movies.title`)
    return rows;
}

// async function getMovieDetails(id) {
//     const {rows} = pool.query(`SELECT`)
// }

module.exports = {
    getAllMovies,
}