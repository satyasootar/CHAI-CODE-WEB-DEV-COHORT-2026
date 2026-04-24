import express from "express";
import cors from "cors";
import { resolve } from "path";

import authRouter from "./module/auth/auth.routes.js";
import movieRouter from "./module/movie/movie.routes.js";
import seatRouter from "./module/seat/seat.routes.js";
import bookingRouter from "./module/booking/booking.routes.js";

export function createApplication() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.sendFile(resolve(process.cwd(), "index.html"));
  });

  app.use(authRouter);
  app.use(movieRouter);
  app.use(seatRouter);
  app.use(bookingRouter);

  return app;
}
