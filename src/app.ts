import express, { json, Application } from "express";

import { startDatabase } from "./database";
import { validateMovieExistsById, verifyMovieNameExists } from "./middlewares";
import {
  createMovie,
  deleteMovieById,
  readMovie,
  readMovieById,
  updateMovieById,
} from "./logic";

const app: Application = express();
app.use(json());

app.use("/movies/:id", validateMovieExistsById);

app.post("/movies", verifyMovieNameExists, createMovie);
app.get("/movies", verifyMovieNameExists, readMovie);
app.get("/movies/:id", readMovieById);
app.patch("/movies/:id", verifyMovieNameExists, updateMovieById);
app.delete("/movies/:id", deleteMovieById);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMsg);
});
