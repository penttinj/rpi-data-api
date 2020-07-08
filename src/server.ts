/* eslint-disable no-process-exit */
import http from "http";
import express from "express";
import config from "./config";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./components";
import errorHandlers from "./middleware/errorHandlers";

process.on("uncaughtException", (err) => {
  // TODO: Add winston log
  console.log("Uncaught Exception");
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  // TODO: Add winston log
  console.log("Uncaught Rejection");
  console.log(err);
  process.exit(1);
});

console.log("Errorhandlers: ", errorHandlers);
const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);
const server = http.createServer(router);

server.listen(config.PORT, () => console.log(`Server is running http://localhost:${config.PORT}...`));
