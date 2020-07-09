import {
  Request, Response, NextFunction, RequestHandler,
} from "express";
import { logger, emptyQuery } from "../../utils";
import { HTTP400Error } from "../../utils/httpErrors";

export const sensorDataQuery = (req: Request, res: Response, next: NextFunction) => {
  if (emptyQuery(req.query)) {
    logger.info("Query object is empty");
    throw new HTTP400Error("Queries were empty (atmos)");
  } else {
    next();
  }
};
