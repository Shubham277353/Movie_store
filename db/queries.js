const pool = require("./pool");

async function allMovies() {
    const { rows } = await pool.query(`SELECT * From movies ORDER BY movies.title`)
    return rows;
}

async function getGenres() {
    const {rows} = await pool.query('SELECT * FROM categories');
    return rows;
}

module.exports = {
    allMovies,
    getGenres
}