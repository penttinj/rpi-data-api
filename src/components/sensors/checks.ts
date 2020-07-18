/* eslint-disable no-restricted-syntax */
import {
  Request, Response, NextFunction, RequestHandler,
} from "express";
import { logger, emptyQuery } from "../../utils";
import { HTTP400Error } from "../../utils/httpErrors";

const sensorList = ["temperature", "humidity", "co2"];

const mustInclude = (queries: string[], comparitor: string[]): boolean => {
  for (const val of queries) {
    if (!comparitor.includes(val)) {
      console.log("does not include", val);
      return false;
    }
  }
  return true;
};

export const sensorDataQuery = (req: Request, res: Response, next: NextFunction) => {
  if (emptyQuery(req.query)) {
    logger.info("Query object is empty");
    throw new HTTP400Error("Queries were empty (atmos)");
  } else if (!mustInclude((req.query.sensors as string).split(","), sensorList)) {
    throw new HTTP400Error("Sensors query contains illegal elements");
  } else {
    next();
  }
};

export const sanitize = (req: Request, res: Response, next: NextFunction) => {

};
