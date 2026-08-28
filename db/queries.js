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


async function getGenreMovies(id) {
    const { rows } = await pool.query(`
        SELECT 
        m.id, m.title,
        m.year_released,
        m.image_url,
        c.name AS genre
        FROM movies m
        JOIN movie_genres mg
        ON m.id = mg.movie_id
        JOIN categories c
        ON mg.category_id = c.id
        WHERE
        c.id = $1
        `, [id]);

    return rows;
    
}

async function getDirectorMovies(id) {
    const { rows } = await pool.query(`
        SELECT 
        m.id, m.title,
        m.year_released,
        m.image_url,
        d.name
        FROM movies m
        JOIN directors d
        ON m.director_id = d.id
        WHERE
        d.id = $1
        `, [id]);

    return rows;
    
}




module.exports = {
    allMovies,
    getGenres,
    getDirectors,
    getMovieInfo,
    getGenreMovies,
    getDirectorMovies
}