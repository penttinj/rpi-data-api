/* eslint-disable no-undef */
import express, { Router } from "express";
import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { applyMiddleware, applyRoutes } from "../../utils";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../components/sensors/routes";
import { initMongo } from "../../config/mongodb";

jest.mock("jsonwebtoken");
(jwt as any).verify(() => () => (true));

describe("routes", () => {
  let router: Router;
  const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMyMSwiaWF0IjoxNTk1MzI1NzI1LCJleHAiOjE1OTU5MzA1MjV9.1qfw9S2PBdP2m0RWBaS0f5JKNAp3dXMmh5sCw0y_8Ss";

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
    return initMongo();
  });

  afterEach(() => {
    mongoose.connection.close();
  });

  test("Valid GET query, 2 sensors with history", async () => {
    const response = await request(router)
      .get("/api/sensors/?sensor=co2&sensor=outside_humidity&count=11")
      .set("authorization", auth);
    expect(response.status).toEqual(200);
  });
  test("Valid GET query, 1 sensor", async () => {
    const response = await request(router)
      .get("/api/sensors/?sensor=co2")
      .set("authorization", auth);
    expect(response.status).toEqual(200);
    expect(response.body.data[0].length).toBe(1);
  });
  test("Valid GET query, 4 sensors", async () => {
    const response = await request(router)
      .get("/api/sensors/?sensor=co2&sensor=outside_humidity&sensor=inside_temperature&sensor=outside_temperature")
      .set("authorization", auth);
    expect(response.status).toEqual(200);
    expect(response.body.data[0].length).toBe(4);
  });

  test("An invalid GET query param", async () => {
    const response = await request(router)
      .get("/api/sensors/?sensor=co2&sensor=outside_humidiRty&count=11")
      .set("authorization", auth);
    expect(response.status).toEqual(400);
  });

  test("A valid sensor POST with 2 sensors", async () => {
    const response = await request(router)
      .post("/api/sensors/")
      .set("authorization", auth)
      .send(
        {
          data: [
            {
              name: "Outside_Temperature",
              value: 2,
              place: "Outside",
            },
            {
              name: "co2",
              value: 300,
              place: "Outside",
            },
          ],
        },
      );

    expect(response.status).toEqual(200);
    expect(response.body.handledSensors.length).toBe(2);
  });
});
