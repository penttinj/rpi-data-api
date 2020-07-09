import { Response, NextFunction } from "express";
import { HTTPClientError, HTTP404Error } from "./httpErrors";
import config from "../config";
import { logger } from ".";

interface StatusError extends Error {
  statusCode: number;
  responseBody: any;
}

export const notFoundError = () => {
  throw new HTTP404Error("404 Method not found :s");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    logger.info(err.stack);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error | StatusError, res: Response, next: NextFunction) => {
  if (config.NODE_ENV === "production") {
    logger.error(err.stack);
    res.status(500).send("Internal Server Error.");
  } else if ((err as StatusError).responseBody) {
    logger.error({ message: err.stack, type: "Rejection", responseBody: (err as StatusError).responseBody });
    res.status(500).send(`<b>Caught Rejection:</b><br/>${err.stack}`);
  } else {
    logger.error(err.stack);
    res.status(500).send(err.stack);
  }
};
