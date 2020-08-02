import { Request, Response, NextFunction } from "express";
import { body, check, query } from "express-validator";
import { parse } from "path";
import { queryCheck, bodyCheck } from "./checks";
import { authenticate } from "../../middleware/authenticate";
import { handleValidatorResult } from "../../middleware/handleValidatorResult";
import * as SensorsService from "./SensorsService";
import { logger } from "../../utils";
import { HTTP400Error } from "../../utils/httpErrors";

export default [
  {
    path: "/api/sensors",
    method: "get",
    handler: [
      authenticate,
      query("sensor.*").exists().trim().escape(), // Yeah these express validators could be in the check
      query("count")
        .optional()
        .trim()
        .isNumeric()
        .toInt()
        .escape(),
      handleValidatorResult,
      queryCheck,
      async (req: Request, res: Response, next: NextFunction) => {
        console.log("GET /api/sensors", req.query);
        const { sensor, count } = req.query;
        const parsedQuery = await SensorsService.parseRequest(
          sensor as string[] | string, count as string,
        );
        const data = await SensorsService.getData(parsedQuery)
          .catch((e) => next(e));
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
        res.status(200).json({ hey: "yo" });
        res.end();
      },
    ],
  },
  {
    path: "/api/sensors",
    method: "post",
    handler: [
      authenticate,
      body(["data.*.name", "data.*.value", "data.*.place"]).exists().trim().escape(),
      body("data.*.value").isNumeric().toInt(),
      handleValidatorResult,
      bodyCheck,
      async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.query);
        const result = await SensorsService.postData(req.body.data)
          /**
           * Not sure if having a .catch() or try/catch block here is sane, as it also requires this
           * main controller fuinction to also have a next(). Since something weird unaccounted for
           * happened at the Service/Model level, maybe this process should just crash?
           */
          .catch((e) => next(e));
        res.status(200).json(result);
        res.end();
      },
    ],
  },
  {
    path: "/api/sensors",
    method: "options",
    handler: [
      authenticate,
      async (req: Request, res: Response) => {
        console.log("");
      },
    ],
  },
];
