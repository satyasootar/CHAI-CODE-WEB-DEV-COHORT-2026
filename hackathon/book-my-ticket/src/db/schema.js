import { pool } from "./pool.js";

export async function initializeSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id),
      movie_id INT NOT NULL,
      seat_id INT NOT NULL REFERENCES seats(id),
      booked_at TIMESTAMP DEFAULT NOW(),
      UNIQUE (movie_id, seat_id)
    )
  `);
}
