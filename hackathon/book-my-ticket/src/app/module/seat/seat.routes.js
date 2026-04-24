import { Router } from "express";
import { pool } from "../../../db/pool.js";

const seatRouter = Router();

seatRouter.get("/seats", async (req, res) => {
  const result = await pool.query("select * from seats");
  res.send(result.rows);
});

export default seatRouter;
