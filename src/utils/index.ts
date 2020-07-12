/* eslint-disable no-restricted-syntax */
import {
  Router, Request, Response, NextFunction,
} from "express";
import winston from "winston";
import jwt from "jsonwebtoken";
import config from "../config";

export const emptyQuery = (query: Object): boolean => {
  if (Object.keys(query).length === 0) return true;
  return false;
};

type TWrapper = ((router: Router) => void);

export const applyMiddleware = (
  middlewares: TWrapper[],
  router: Router,
) => {
  for (const middleware of middlewares) {
    middleware(router);
  }
};

type THandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

type TRoute = {
  path: string;
  method: string;
  handler: THandler | THandler[];
}

export const applyRoutes = (
  routes: TRoute[],
  router: Router,
) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    /* router.use(route.path, route.handler); <= My shitty solution */
    (router as any)[method](path, handler); // The chad way
  }
};

export const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    get time() { return new Date().toLocaleString(); },
  },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "api.log" }),
  ],
});

if (config.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// TEST CODE, DELETE DIS. Only used for creating tokens in development
export const createToken = () => {
  try {
    const JWT_SECRET = config.JWT_SECRET_KEY as jwt.Secret;
    const id = 321;

    const accessToken = jwt.sign({ sub: id }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: "7d",
    });
    console.log("Access Token Generated: ", accessToken);
    return accessToken;
  } catch (e) {
    throw new Error('Couldn\'t be created');
  }
};
