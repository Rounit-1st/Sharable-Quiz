# Quiz App (Node + Postgres)

A minimal full‑stack quiz application using Node.js (Express), PostgreSQL, and a vanilla HTML/CSS/JS frontend.

## Users can select a quiz, answer questions, and submit.

- Server scores the attempt and returns the result.

- Simple schema + seeding included.

## Tech Stack

- Backend: Node.js, Express, pg

- Database: PostgreSQL

- Frontend: Vanilla HTML, CSS, JS (served from Express public/)

## Setup

1) Prerequisites
Node.js 18+ (works with Node 20 as well)
PostgreSQL 13+
2) Create database & user
3) Environment variables (.env)
Create a .env file in the project root:
`` code
# Example for local dev
PGHOST=localhost
PGPORT=5432
PGDATABASE=quiz_app
PGUSER=postgres
PGPASSWORD=postgres
PORT=3000
``
Adjust PGUSER/PGPASSWORD if you created a dedicated user.

4) Install dependencies

``bash npm init -y
npm install express pg dotenv cors
npm install --save-dev nodemon
``
5) Database schema & seed
