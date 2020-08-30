/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GenerateToken, parseArgs, genToken } from "./generateToken";

jest.mock("dotenv");

describe("Token generation CLI", () => {
  test("main: ", async () => {
  });

  test("Get token back from genToken()", async () => {
    const options = {
      _: [], o: "bobby", owner: "bobby", i: 99999, id: 99999, $0: "dist/bin/generateToken.js",
    };
    const token = genToken(options, "kappa123");
    expect(token).toBeDefined();
    const verified = jwt.verify(token, "kappa123");
    console.log("verified::::::", verified);
    expect((verified as any).id).toBe(options.i);
    expect((verified as any).owner).toBe(options.o);
  });
});
