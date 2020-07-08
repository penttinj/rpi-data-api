import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "./httpErrors";
import config from "../config";

interface StatusError extends Error {
  statusCode: number;
  responseBody: any;
}

export const notFoundError = () => {
  throw new HTTP404Error("404 Method not found :s");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error | StatusError, res: Response, next: NextFunction) => {
  if (config.NODE_ENV === "production") {
    res.status(500).send("Internal Server Error.");
  } else if ((err as StatusError).responseBody) {
    console.log("Server Error: Rejection from a promise probably happened");
    res.status(500).send(`<b>CAUGHT REJECTION</b><br/>${err.stack}`);
  } else {
    console.log("Server Error 500");
    res.status(500).send(err.stack);
  }
};
