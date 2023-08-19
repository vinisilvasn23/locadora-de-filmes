import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import { Movie } from "./interfaces";

const validateMovieExistsById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const movieId: number = Number(req.params.id);

  const queryString: string = `
    SELECT *
    FROM "movies"
    WHERE "id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [movieId],
  };

    const queryResult: QueryResult = await client.query(queryConfig);

    if (queryResult.rowCount === 0) {
    return res.status(404).json({ message: "Movie not found!" });
    }

    res.locals = { ...res.locals, foundMovie: queryResult.rows[0] };
    return next();
};


const verifyMovieNameExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { name } = req.body;

  const queryString: string = ` 
    SELECT *
    FROM "movies"
    WHERE "name" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult = await client.query(queryConfig);
  const movie: Movie = queryResult.rows[0];

  if (movie) {
   return res.status(409).json({ message: "Movie name already exists!" });
  }

 return next();
};

export { 
    verifyMovieNameExists, 
    validateMovieExistsById
};
