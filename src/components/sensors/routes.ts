import { Request, Response, NextFunction } from "express";
import { sensorDataQuery } from "./checks";
import { getData } from "./sensorsService";
import { logger } from "../../utils";

export default [
  {
    path: "/api/sensors",
    method: "get",
    handler: [
      sensorDataQuery,
      async (req: Request, res: Response) => {
        logger.info("yeet", req.query, req.params);
        const data = getData(req.query);
        res.status(200).json(data);
        res.end();
      },
    ],
  },
  {
    path: "/api/sensors",
    method: "post",
    handler: [
      sensorDataQuery,
      async (req: Request, res: Response) => {
        res.type('json').status(200);
        res.write(`The request URL is: ${req.url} <br/>`);
        res.end();
      },
    ],
  },
];
