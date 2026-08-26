#! /usr/bin/env node

const { Client } = require("pg");

const SQL = ` 
CREATE TABLE categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
    );

CREATE TABLE directors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    director_id INTEGER REFERENCES directors(id),
    year_released INTEGER
);

CREATE TABLE movie_genres (
    movie_id INTEGER REFERENCES movies(id),
    category_id INTEGER REFERENCES categories(id),
    PRIMARY KEY (movie_id, category_id)
);

INSERT INTO categories (name)
VALUES
  ('Sci-Fi'),
  ('Action'),
  ('Horror'),
  ('Psychological'),
  ('Thriller'),
  ('Comedy'),
  ('Romantic'),
  ('Animation'),
  ('Mind Bending'),
  ('Fantasy'),
  ('Western'),
  ('Historical'),
  ('Drama'),
  ('Crime'),
  ('Mystery');


INSERT INTO directors (name)
VALUES
  ('Christopher Nolan'),
  ('Ridley Scott'),
  ('Jordan Peele'),
  ('Steven Spielberg'),
  ('Martin Scorsese'),
  ('Hayao Miyazaki'),
  ('Satyajit Ray'),
  ('James Cameron'),
  ('Denis Villeneuve'),
  ('Bong Joon Ho'),
  ('Quentin Tarantino');


INSERT INTO movies (title, year_released, director_id)
VALUES
  ('Inception', 2010, 1),
  ('The Dark Knight', 2008, 1),
  ('Interstellar', 2014, 1),
  ('Dunkirk', 2017, 1),
  ('Oppenheimer', 2023, 1),

  ('Alien', 1979, 2),
  ('Blade Runner', 1982, 2),
  ('Gladiator', 2000, 2),
  ('The Martian', 2015, 2),

  ('Get Out', 2017, 3),
  ('Us', 2019, 3),
  ('Nope', 2022, 3),

  ('Jaws', 1975, 4),
  ('E.T. the Extra-Terrestrial', 1982, 4),
  ('Jurassic Park', 1993, 4),
  ('Saving Private Ryan', 1998, 4),

  ('Taxi Driver', 1976, 5),
  ('Goodfellas', 1990, 5),
  ('The Departed', 2006, 5),
  ('The Wolf of Wall Street', 2013, 5),

  ('My Neighbor Totoro', 1988, 6),
  ('Princess Mononoke', 1997, 6),
  ('Spirited Away', 2001, 6),
  ('Howl''s Moving Castle', 2004, 6),

  ('Pather Panchali', 1955, 7),
  ('Aparajito', 1956, 7),
  ('The Music Room', 1958, 7),

  ('The Terminator', 1984, 8),
  ('Aliens', 1986, 8),
  ('Titanic', 1997, 8),
  ('Avatar', 2009, 8),

  ('Prisoners', 2013, 9),
  ('Sicario', 2015, 9),
  ('Arrival', 2016, 9),
  ('Dune', 2021, 9),

  ('Memories of Murder', 2003, 10),
  ('The Host', 2006, 10),
  ('Snowpiercer', 2013, 10),
  ('Parasite', 2019, 10),

  ('Reservoir Dogs', 1992, 11),
  ('Pulp Fiction', 1994, 11),
  ('Kill Bill: Vol. 1', 2003, 11),
  ('Inglourious Basterds', 2009, 11),
  ('Django Unchained', 2012, 11);

INSERT INTO movie_genres (movie_id, category_id)
VALUES
  -- Inception (1): Sci-Fi, Psychological, Thriller, Mind Bending
  (1, 1),
  (1, 4),
  (1, 5),
  (1, 9),

  -- The Dark Knight (2): Action, Thriller, Crime, Drama
  (2, 2),
  (2, 5),
  (2, 14),
  (2, 13),

  -- Interstellar (3): Sci-Fi, Drama, Mind Bending
  (3, 1),
  (3, 13),
  (3, 9),

  -- Dunkirk (4): Action, Historical, Drama
  (4, 2),
  (4, 12),
  (4, 13),

  -- Oppenheimer (5): Historical, Drama, Psychological
  (5, 12),
  (5, 13),
  (5, 4),

  -- Alien (6): Sci-Fi, Horror, Thriller
  (6, 1),
  (6, 3),
  (6, 5),

  -- Blade Runner (7): Sci-Fi, Mystery, Thriller
  (7, 1),
  (7, 15),
  (7, 5),

  -- Gladiator (8): Action, Historical, Drama
  (8, 2),
  (8, 12),
  (8, 13),

  -- The Martian (9): Sci-Fi, Drama
  (9, 1),
  (9, 13),

  -- Get Out (10): Horror, Psychological, Thriller, Mystery
  (10, 3),
  (10, 4),
  (10, 5),
  (10, 15),

  -- Us (11): Horror, Psychological, Thriller, Mystery
  (11, 3),
  (11, 4),
  (11, 5),
  (11, 15),

  -- Nope (12): Horror, Mystery, Sci-Fi, Thriller
  (12, 3),
  (12, 15),
  (12, 1),
  (12, 5),

  -- Jaws (13): Horror, Thriller, Drama
  (13, 3),
  (13, 5),
  (13, 13),

  -- E.T. the Extra-Terrestrial (14): Sci-Fi, Fantasy, Animation
  (14, 1),
  (14, 10),
  (14, 8),

  -- Jurassic Park (15): Sci-Fi, Action, Thriller
  (15, 1),
  (15, 2),
  (15, 5),

  -- Saving Private Ryan (16): Action, Historical, Drama
  (16, 2),
  (16, 12),
  (16, 13),

  -- Taxi Driver (17): Crime, Psychological, Drama
  (17, 14),
  (17, 4),
  (17, 13),

  -- Goodfellas (18): Crime, Drama
  (18, 14),
  (18, 13),

  -- The Departed (19): Crime, Thriller, Drama
  (19, 14),
  (19, 5),
  (19, 13),

  -- The Wolf of Wall Street (20): Crime, Comedy, Drama
  (20, 14),
  (20, 6),
  (20, 13),

  -- My Neighbor Totoro (21): Animation, Fantasy, Comedy
  (21, 8),
  (21, 10),
  (21, 6),

  -- Princess Mononoke (22): Animation, Fantasy, Action
  (22, 8),
  (22, 10),
  (22, 2),

  -- Spirited Away (23): Animation, Fantasy, Mind Bending
  (23, 8),
  (23, 10),
  (23, 9),

  -- Howl's Moving Castle (24): Animation, Fantasy, Romantic
  (24, 8),
  (24, 10),
  (24, 7),

  -- Pather Panchali (25): Drama, Historical
  (25, 13),
  (25, 12),

  -- Aparajito (26): Drama, Historical
  (26, 13),
  (26, 12),

  -- The Music Room (27): Drama, Historical
  (27, 13),
  (27, 12),

  -- The Terminator (28): Sci-Fi, Action, Thriller
  (28, 1),
  (28, 2),
  (28, 5),

  -- Aliens (29): Sci-Fi, Action, Horror
  (29, 1),
  (29, 2),
  (29, 3),

  -- Titanic (30): Romantic, Drama, Historical
  (30, 7),
  (30, 13),
  (30, 12),

  -- Avatar (31): Sci-Fi, Action, Fantasy
  (31, 1),
  (31, 2),
  (31, 10),

  -- Prisoners (32): Mystery, Crime, Thriller
  (32, 15),
  (32, 14),
  (32, 5),

  -- Sicario (33): Crime, Action, Thriller
  (33, 14),
  (33, 2),
  (33, 5),

  -- Arrival (34): Sci-Fi, Drama, Mystery, Mind Bending
  (34, 1),
  (34, 13),
  (34, 15),
  (34, 9),

  -- Dune (35): Sci-Fi, Action, Fantasy
  (35, 1),
  (35, 2),
  (35, 10),

  -- Memories of Murder (36): Crime, Mystery, Thriller, Drama
  (36, 14),
  (36, 15),
  (36, 5),
  (36, 13),

  -- The Host (37): Horror, Sci-Fi, Action, Comedy
  (37, 3),
  (37, 1),
  (37, 2),
  (37, 6),

  -- Snowpiercer (38): Sci-Fi, Action, Thriller, Drama
  (38, 1),
  (38, 2),
  (38, 5),
  (38, 13),

  -- Parasite (39): Thriller, Drama, Comedy, Crime
  (39, 5),
  (39, 13),
  (39, 6),
  (39, 14),

  -- Reservoir Dogs (40): Crime, Thriller, Drama
  (40, 14),
  (40, 5),
  (40, 13),

  -- Pulp Fiction (41): Crime, Drama, Comedy
  (41, 14),
  (41, 13),
  (41, 6),

  -- Kill Bill: Vol. 1 (42): Action, Crime, Thriller
  (42, 2),
  (42, 14),
  (42, 5),

  -- Inglourious Basterds (43): Action, Historical, Drama
  (43, 2),
  (43, 12),
  (43, 13),

  -- Django Unchained (44): Western, Action, Drama
  (44, 11),
  (44, 2),
  (44, 13);

`;

const dbUrl = process.env.DB_URL;

async function main() {
  console.log("Seeding...");

  const client = new Client({
    connectionString: dbUrl,
    ssl: {
      rejectUnauthorized: false, 
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done");
  } catch (err) {
    console.error("Database Error: ", err);
  } finally {
    await client.end();
  }
}

main();
