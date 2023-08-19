import { Request, Response } from "express";
import { client } from "./database";
import { Movie } from "./interfaces";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const queryFormat: string = format(
    'INSERT INTO "movies" (%I) VALUES (%L) RETURNING *;',
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryResult: QueryResult = await client.query(queryFormat);
  const movie: Movie = queryResult.rows[0];

  return res.status(201).json(movie);
};

const readMovie = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.query;

  let queryConfig: QueryConfig = {
    text: `SELECT * FROM "movies";`,
  };

  if (category) {
    queryConfig = {
      text: `SELECT * FROM "movies" WHERE "category" = $1;`,
      values: [category],
    };
  }

  const queryResult: QueryResult = await client.query(queryConfig);

  if (category && queryResult.rowCount === 0) {
    queryConfig = { text: "SELECT * FROM movies;" };

    const allMoviesQueryResult: QueryResult = await client.query(queryConfig);
    return res.status(200).json(allMoviesQueryResult.rows);
  }

  return res.status(200).json(queryResult.rows);
};

const readMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json(res.locals.foundMovie);
};

const updateMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);

  const queryString: string = `
    UPDATE "movies"
    SET (%I) = ROW(%L)
    WHERE "id" = $1
    RETURNING *;
  `;

  const queryFormat = format(
    queryString,
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [movieId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const updatedMovie: Movie = queryResult.rows[0];

  return res.status(200).json(updatedMovie);
};

const deleteMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);

  const queryString: string = `
    DELETE FROM "movies"
    WHERE "id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [movieId],
  };

  await client.query(queryConfig);
  return res.status(204).json();
};

export {
  createMovie,
  readMovie,
  readMovieById,
  updateMovieById,
  deleteMovieById,
};
