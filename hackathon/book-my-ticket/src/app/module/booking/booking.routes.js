import { Router } from "express";
import { pool } from "../../../db/pool.js";
import { authenticate } from "../../common/auth.js";
import { mockMovies } from "../../common/mockMovies.js";

const bookingRouter = Router();

bookingRouter.post("/movies/:movieId/bookings", authenticate, async (req, res) => {
  const movieId = Number(req.params.movieId);
  const seatId = Number(req.body?.seatId);

  if (!Number.isInteger(movieId) || !Number.isInteger(seatId)) {
    res.status(400).send({ error: "movieId and seatId must be valid integers" });
    return;
  }

  const movieExists = mockMovies.some((movie) => movie.id === movieId);
  if (!movieExists) {
    res.status(404).send({ error: "Movie not found" });
    return;
  }

  const conn = await pool.connect();
  try {
    await conn.query("BEGIN");

    const seatResult = await conn.query("SELECT id FROM seats WHERE id = $1 FOR UPDATE", [seatId]);
    if (seatResult.rowCount === 0) {
      await conn.query("ROLLBACK");
      res.status(404).send({ error: "Seat not found" });
      return;
    }

    const bookingResult = await conn.query(
      "SELECT id FROM bookings WHERE movie_id = $1 AND seat_id = $2 FOR UPDATE",
      [movieId, seatId]
    );
    if (bookingResult.rowCount > 0) {
      await conn.query("ROLLBACK");
      res.status(409).send({ error: "Seat already booked for this movie" });
      return;
    }

    const insertBooking = await conn.query(
      "INSERT INTO bookings (user_id, movie_id, seat_id) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, movieId, seatId]
    );

    await conn.query("UPDATE seats SET isbooked = 1, name = $2 WHERE id = $1", [seatId, req.user.username]);
    await conn.query("COMMIT");

    res.status(201).send({
      message: "Seat booked successfully",
      booking: insertBooking.rows[0],
    });
  } catch (error) {
    await conn.query("ROLLBACK");
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    conn.release();
  }
});

bookingRouter.put("/:id/:name", authenticate, async (req, res) => {
  const conn = await pool.connect();
  try {
    const id = Number(req.params.id);
    const name = req.user.username || req.params.name;

    if (!Number.isInteger(id)) {
      res.status(400).send({ error: "Invalid seat id" });
      return;
    }

    await conn.query("BEGIN");

    const sql = "SELECT * FROM seats where id = $1 and isbooked = 0 FOR UPDATE";
    const result = await conn.query(sql, [id]);

    if (result.rowCount === 0) {
      await conn.query("ROLLBACK");
      res.status(409).send({ error: "Seat already booked" });
      return;
    }

    const existingBooking = await conn.query(
      "SELECT id FROM bookings WHERE movie_id = $1 AND seat_id = $2 FOR UPDATE",
      [1, id]
    );
    if (existingBooking.rowCount > 0) {
      await conn.query("ROLLBACK");
      res.status(409).send({ error: "Seat already booked" });
      return;
    }

    await conn.query("INSERT INTO bookings (user_id, movie_id, seat_id) VALUES ($1, $2, $3)", [
      req.user.id,
      1,
      id,
    ]);

    const sqlU = "update seats set isbooked = 1, name = $2 where id = $1";
    const updateResult = await conn.query(sqlU, [id, name]);

    await conn.query("COMMIT");
    res.send(updateResult);
  } catch (error) {
    await conn.query("ROLLBACK");
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  } finally {
    conn.release();
  }
});

export default bookingRouter;
