import { Router } from "express";
import { mockMovies } from "../../common/mockMovies.js";

const movieRouter = Router();

movieRouter.get("/movies", (req, res) => {
  res.send(mockMovies);
});

export default movieRouter;
