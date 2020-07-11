import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { sensorDataQuery } from "./checks";
import { getData } from "./SensorsService";
import { logger } from "../../utils";

export default [
  {
    path: "/api/sensors/:parr",
    method: "get",
    handler: [
      sensorDataQuery,
      async (req: Request, res: Response) => {
        console.log(req.query);
        console.log(req.params);
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
      body(["things.*.name", "things.*.value"]).escape(),
      async (req: Request, res: Response) => {
        console.log(req.body);
        res.status(200).json(req.body);
        res.end();
      },
    ],
  },
];
