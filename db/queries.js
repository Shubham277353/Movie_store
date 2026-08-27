const pool = require("./pool");

async function allMovies() {
    const { rows } = await pool.query(`SELECT * From movies ORDER BY movies.title`)
    return rows;
}

async function getGenres() {
    const {rows} = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getDirectors() {
    const {rows} = await pool.query('SELECT * FROM directors');
    return rows;
}

async function getMovieInfo(id) {
    const {rows} = await pool.query(`
        SELECT 
        movies.title,
        movies.year_released,
        movies.image_url, 
        ARRAY_AGG(JSON_BUILD_OBJECT(
            'id', categories.id,
            'name', categories.name
            )) AS genres,
        directors.name AS Directors 
        FROM movies
        JOIN movie_genres mg
            ON movies.id = mg.movie_id 
        JOIN categories 
            ON mg.category_id = categories.id
        JOIN directors
            ON movies.director_id = directors.id
        WHERE movies.id = $1 
        GROUP BY 
        movies.id,
        movies.title,
        movies.image_url,
        movies.year_released,
        directors.name`, [id]);
    return rows[0];
}


module.exports = {
    allMovies,
    getGenres,
    getDirectors,
    getMovieInfo,
}