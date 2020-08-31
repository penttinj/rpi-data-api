/* eslint-disable no-process-exit */
import http from "http";
import express from "express";
import { PORT } from "./config";
import {
  applyMiddleware, applyRoutes, logger,
} from "./utils";
import middleware from "./middleware";
import routes from "./components";
import errorHandlers from "./middleware/errorHandlers";
import { initMongo } from "./config/mongodb";

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught Exception");
  console.log(err);
  logger.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
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

  const httpServer = http.createServer(router);
  // TODO: HTTPS server
  await initMongo();
  httpServer.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}...`));
}
go();
