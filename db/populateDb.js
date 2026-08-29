#! /usr/bin/env node

const { Client } = require("pg");

const SQL = ` 
CREATE TABLE categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
    );

CREATE TABLE directors (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    director_id INTEGER REFERENCES directors(id),
    year_released INTEGER,
    image_url TEXT
);

CREATE TABLE movie_genres (
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
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


INSERT INTO directors (name, image_url)
VALUES
  ('Christopher Nolan', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8G4BG9vQtRSx0Sitx4sQXvr2eLdfS0b7VBSD4p04Nig&s=10'),
  ('Ridley Scott', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3IPwu11CkWwRmEmP9PCXWYWDXNZaCbl3Kr3Mb-SArg&s=10'),
  ('Jordan Peele', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXKUDAiEH-T0BB7EASKO58L_YQ8APDVDoMitC-XHUPMg&s=10'),
  ('Steven Spielberg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXKUDAiEH-T0BB7EASKO58L_YQ8APDVDoMitC-XHUPMg&s=10'),
  ('Martin Scorsese', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2oSx61CBjs4R--QxXYw4YFpgSXifpQwsrX5gKZeyZbw&s=10'),
  ('Hayao Miyazaki', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgaFAsM3gq_wsxPEmPMddWN8RDdmowdYu_V9MzdxXtjA&s=10'),
  ('Satyajit Ray', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPIDdqxHv2yQGQXJAiVn4KiqiSdBBn2ggzqcYB0urqQ&s'),
  ('James Cameron', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-9BA8d7_4kcZ30QpvLkOyxEOzAO1te6GeCiEzKfuBg&s=10'),
  ('Denis Villeneuve', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFhIrIiiEYtI3yvgyrgJ1-5RGcZoE9Lv7PWzZwXilErw&s=10'),
  ('Bong Joon Ho', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJzl4bFfRitR1GS0NE_2G2QYxPKR9UTw7qDwb0_D8AQ&s=10'),
  ('Quentin Tarantino', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6PRpILfv1X6q8I1jmrylz2qD7DNOp7-S3Mg_UFS0glbvUdGEoy7tdDMc&s=10');


INSERT INTO movies (title, year_released, director_id, image_url)
VALUES
  ('Inception', 2010, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNCylezaRurf7U73lCHLAO9uoFe1qH1WazX7k1bGLyA&s'),
  ('The Dark Knight', 2008, 1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PhCcXO0pyxx4bXbkEJbCmPNQNj7nmFjdN1gPy0JCsw&s=10'),
  ('Interstellar', 2014, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6MBU9VxzNxqU0gzzOsgDR0Mpxn4_6BDHIzD-Xc8YaQ&s=10'),
  ('Dunkirk', 2017, 1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJJKiarCS1sZI5F-kqFu4deqfn2kQwJuiI91uWP2cNQ&s=10'),
  ('Oppenheimer', 2023, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3gsJAEwsM9Y3lIK2f6M24jtsae8ljoF2kFvC03Qn7Tw&s'),

  ('Alien', 1979, 2, 'https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg'),
    ('Blade Runner', 1982, 2, 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png'),
    ('Gladiator', 2000, 2, 'https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original'),
    ('The Martian', 2015, 2, 'https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg'),

    ('Get Out', 2017, 3, 'https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png'),
    ('Us', 2019, 3, 'https://upload.wikimedia.org/wikipedia/en/0/00/Us_%282019%29_theatrical_poster.png'),
    ('Nope', 2022, 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgBzVkeiwkRhOLDrlCvSVOP2-KATMV1PWMVM0BEiGuZA&s=10'),

    ('Jaws', 1975, 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzJFvESnqt7_HImgWqEea0jwiH6G8aoP5rxHePz7h9yA&s=10'),
    ('E.T. the Extra-Terrestrial', 1982, 4, 'https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg'),
    ('Jurassic Park', 1993, 4, 'https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg'),
    ('Saving Private Ryan', 1998, 4, 'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg'),

    ('Taxi Driver', 1976, 5, 'https://upload.wikimedia.org/wikipedia/en/3/33/Taxi_Driver_%281976_film_poster%29.jpg'),
    ('Goodfellas', 1990, 5, 'https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg'),
    ('The Departed', 2006, 5, 'https://upload.wikimedia.org/wikipedia/en/5/50/Departed234.jpg'),
    ('The Wolf of Wall Street', 2013, 5, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_yEm4pB3ad0HUdj6POYpN663g04yFd_VnAnE0qFgKw&s=10'),

    ('My Neighbor Totoro', 1988, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZRU-FTaffoFhuvDcNgQERA9pEdLu6n27Kq5gWpTkeQ&s=10'),
    ('Princess Mononoke', 1997, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGfFTU0jGct1AZJqHpyR9rVG1GPIoUBiWL2ASAI4SZaw&s=10'),
    ('Spirited Away', 2001, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINJHZKscWPPgIL0sTcPF6pnqcLODb2g1jLHgS_qmfOw&s=10'),
    ('Howl''s Moving Castle', 2004, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHMTK2XVh_Rsf3GEKa0B60MCt5i4HKRebcZn4HEDfmw&s=10'),

    ('Pather Panchali', 1955, 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwwz3ojn97kf8HprHyK2BiXZy_mDAtmNJlQqIPv4aRRA&s=10'),
    ('Aparajito', 1956, 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7nydQi8hpPWYvalZFdMm4NSuZMCFbKyG_NIM34tERpw&s=10'),
    ('The Music Room', 1958, 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKzrMQ9mvECRP6JaUEEzZMu_GKME41QoQDOTUiKxOoQ&s=10'),

    ('The Terminator', 1984, 8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbeoqoFGLjgD9hotLW0KIuJ18Vyxr_wilwY03h5MjBUw&s=10'),
    ('Aliens', 1986, 8, 'https://upload.wikimedia.org/wikipedia/en/f/fb/Aliens_poster.jpg'),
    ('Titanic', 1997, 8, 'https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png'),
    ('Avatar', 2009, 8, 'https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg'),

    ('Prisoners', 2013, 9, 'https://upload.wikimedia.org/wikipedia/en/6/63/Prisoners2013Poster.jpg'),
    ('Sicario', 2015, 9, 'https://upload.wikimedia.org/wikipedia/en/4/4b/Sicario_poster.jpg'),
    ('Arrival', 2016, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBiRhOZHOEQQF7_Ra0jGyWFYH6snU2cMCkDToLNo-GQ&s=10'),
    ('Dune', 2021, 9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPuNgtZLLY6Y5-iJi3LlqJpanzPKfHFO-Yz9eO4GDkw&s=10'),

    ('Memories of Murder', 2003, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jlRziTqMxVAoqnojGju-TEqLtRKabq9c603UXMlTLg&s=10'),
    ('The Host', 2006, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwWBjXxqPHuB9WJX4J7BG0S1A_L6fOUKh5lF3PDBNHNA&s=10t'),
    ('Snowpiercer', 2013, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnFzO26sXdq1JVYzNLAXlA4tdQ7oMFMg_P7aZVol0fjA&s=10'),
    ('Parasite', 2019, 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEWP0EtvEQQKA1CUplqT-LzNuKoTzSUssOxxu_7PMoNA&s=10'),

    ('Reservoir Dogs', 1992, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBtNXJF7Ydj8G9shoIrmT1ePlI6azzL8qRE88V21wlA&s=10'),
    ('Pulp Fiction', 1994, 11, 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg'),
    ('Kill Bill: Vol. 1', 2003, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaRK73rYg1WGdgyWn5jzORpVmjfIEhlLGNxNzhuumZw&s=10'),
    ('Inglourious Basterds', 2009, 11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQkOMb-gCibwSGqQh6zACd23o8aEVx_VJyRONufdBzQ&s'),
    ('Django Unchained', 2012, 11, 'https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg');

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

const dbUrl = process.env.DATABASE_URL;

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
    console.error("Database ", err);
  } finally {
    await client.end();
  }
}

main();
