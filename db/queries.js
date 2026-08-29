const pool = require("./pool");

async function allMovies() {
  const { rows } = await pool.query(
    `SELECT * From movies ORDER BY movies.title`,
  );
  return rows;
}

async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getDirectors() {
  const { rows } = await pool.query("SELECT * FROM directors");
  return rows;
}

async function getMovieInfo(id) {
  const { rows } = await pool.query(
    `
        SELECT
        movies.id,
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
        directors.name`,
    [id],
  );
  return rows[0];
}

async function getGenreMovies(id) {
  const { rows } = await pool.query(
    `
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
        `,
    [id],
  );

  return rows;
}

async function getDirectorMovies(id) {
  const { rows } = await pool.query(
    `
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
        `,
    [id],
  );

  return rows;
}

async function addMovie(request) {
  const { rows } = await pool.query(
    `
        INSERT INTO movies(title, year_released, image_url, director_id)
        VALUES($1, $2, $3, $4)
        RETURNING id
        `,
    [request.title, request.releaseDate, request.imageUrl, request.director],
  );
  return rows[0].id;
}

async function addGenres(genres, movieId) {
  for (const genre of genres) {
    await pool.query(
      `INSERT INTO movie_genres (movie_id, category_id)
             VALUES ($1, $2)`,
      [movieId, genre],
    );
  }
}


async function updateMovie(movieId, movieData, genres) {
  const client = await pool.connect();

  try{
    await client.query("BEGIN");

    await client.query(`
      UPDATE movies
      SET title = $1,
      year_released = $2,
      director_id = $3,
      image_url = $4
      WHERE
      id = $5
      `, [movieData.title, movieData.releaseDate, movieData.director, movieData.imageUrl, movieId]);

      await client.query( `
        DELETE FROM movie_genres
        WHERE movie_id = $1`, [movieId]);

      for(const genre of genres){
        await client.query(
        `
        INSERT INTO movie_genres(movie_id, category_id)
        VALUES ($1, $2)
        `,[movieId, genre]
      )};

      await client.query("COMMIT");

  } catch(error){
    await client.query("ROLLBACK");
    throw error;
  }
  finally {
    client.release();
  }

}

module.exports = {
  allMovies,
  getGenres,
  getDirectors,
  getMovieInfo,
  getGenreMovies,
  getDirectorMovies,
  addMovie,
  addGenres,
  updateMovie,
};
