import { Request, Response, NextFunction } from "express";
import { atmosphericDataQuery } from "./checks";

export default [
  {
    path: "/atmos",
    method: "get",
    handler: [
      atmosphericDataQuery,
      async (req: Request, res: Response) => {
        res.type('html').status(200);
        res.write(`The request URL is: ${req.url} <br/>`);
        res.write(req.method);
        res.end();
      },
    ],
  },
];
