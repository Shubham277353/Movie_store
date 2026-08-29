# Movie Store

A simple movie inventory app built with Node.js, Express, PostgreSQL and EJS.

## Live Demo

https://movie-store-sdgy.onrender.com

## What I Learned

This project helped me practice working with PostgreSQL relationships, junction tables, Express routing and controllers, EJS templates, form validation, transactions, and deploying an Express application.

## Features

- View all movies
- View movie details
- Filter movies by genre
- Filter movies by director
- Add new movies
- Edit movies
- Delete movies
- Add multiple genres to a movie
- Admin password protection for editing and deleting
- Movie and director images

## Tech Used

- Node.js
- Express
- PostgreSQL
- EJS
- Tailwind CSS

## Getting Started

Clone the repository:

git clone <your-repository-url>
cd Inventory-Application

Install dependencies:

npm install

Create a `.env` file:

DATABASE_URL=your_database_url
ADMIN_PASSWORD=your_admin_password

Run the app:

node --env-file=.env app.js

The app will be available at:

http://localhost:3000
