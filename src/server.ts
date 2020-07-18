/* eslint-disable no-process-exit */
import http from "http";
import express from "express";
import config from "./config";
import {
  applyMiddleware, applyRoutes, logger, createToken,
} from "./utils";
import middleware from "./middleware";
import routes from "./components";
import errorHandlers from "./middleware/errorHandlers";
import { initMongo } from "./config/mongodb";

process.on("uncaughtException", (err: Error) => {
  // TODO: Add winston log
  console.log("Uncaught Exception");
  console.log(err);
  logger.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  // TODO: Add winston log
  console.log(err);
  console.log("Uncaught Rejection");
  logger.error(err.stack);
  process.exit(1);
});

async function go() {
  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);
  applyMiddleware(errorHandlers, router);

  const token = createToken();
  const server = http.createServer(router);
  await initMongo();
  server.listen(config.PORT, () => console.log(`Server is listening on http://localhost:${config.PORT}...`));
}
go();
