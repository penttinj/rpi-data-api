import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP401Error } from "../utils/httpErrors";
import config from "../config";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  const JWT_SECRET = config.JWT_SECRET_KEY as jwt.Secret;

  if (!token) {
    console.log("No authorization header");
    throw new HTTP401Error();
  }
  console.log("headers");
  console.log(req.headers);

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    console.log("Catch block");
    throw new HTTP401Error();
  }
};
