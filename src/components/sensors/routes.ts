import { Request, Response, NextFunction } from "express";
import { body, check, query } from "express-validator";
import { sensorDataQuery } from "./checks";
import { authenticate } from "../../middleware/authenticate";
import { handleValidator } from "../../middleware/handleValidator";
import { getData, parseRequest } from "./SensorsService";
import { logger } from "../../utils";

export default [
  {
    path: "/api/sensors",
    method: "get",
    handler: [
      authenticate,
      sensorDataQuery,
      query("sensors").exists(),
      query("count").isNumeric(),
      handleValidator,
      async (req: Request, res: Response) => {
        console.log(req.query);
        const { sensors, count } = req.query;
        const parsedQuery = await parseRequest(sensors as string, count as string);
        const data = await getData(parsedQuery);
        console.log(data);
        res.status(200).json(data);
        res.end();
      },
    ],
  },
  {
    path: "/api/sensors/:when",
    method: "get",
    handler: [
      authenticate,
      // sensorDataQuery,
      async (req: Request, res: Response) => {
        console.log(req.query);
        console.log(req.params);
        const data = getData("hello");
        res.status(200).json(data);
        res.end();
      },
    ],
  },
  {
    path: "/api/sensors",
    method: "post",
    handler: [
      authenticate,
      body(["data.*.type", "data.*.value"]).escape(),
      // TODO: Add more input checks
      async (req: Request, res: Response) => {
        console.log(req.body);
        res.status(200).json(req.body);
        res.end();
      },
    ],
  },
];
