/* eslint-disable no-restricted-syntax */
import {
  Request, Response, NextFunction, RequestHandler,
} from "express";
import { logger, emptyQuery } from "../../utils";
import { HTTP400Error } from "../../utils/httpErrors";
import { RawSensorData } from "./SensorsService";

// This list could become an .env var or some json file.
export const sensorList = [
  "inside_temperature",
  "inside_humidity",
  "outside_temperature",
  "outside_humidity",
  "co2"];

const MAX_QUERY_LENGTH = sensorList.length + 1;

const mustInclude = (queries: string[], compareList: string[]): boolean => {
  for (const val of queries) {
    if (!compareList.includes(val)) {
      console.log("does not include", val);
      return false;
    }
  }
  return true;
};

export const queryCheck = (req: Request, res: Response, next: NextFunction) => {
  if (emptyQuery(req.query)) {
    logger.info("Query object is empty");
    throw new HTTP400Error("Queries were empty");
  } else if (Object.keys(req.query).length > MAX_QUERY_LENGTH) {
    throw new HTTP400Error("Too many parameters");
  } else if (!mustInclude((req.query.sensors as string).split(","), sensorList)) {
    throw new HTTP400Error("Sensors query contains illegal elements");
  } else {
    next();
  }
};

export const bodyCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!mustInclude(
    req.body.data.map((el: RawSensorData) => el.name.toLocaleLowerCase()),
    sensorList,
  )) {
    throw new HTTP400Error("The sensors list contains illegal elements");
  } else {
    next();
  }
};

export const sanitize = (req: Request, res: Response, next: NextFunction) => {

};
