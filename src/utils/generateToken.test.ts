/* eslint-disable no-undef */
import yargs from "yargs";
import { commandLine, parseArgs, genToken } from "./generateToken";

process.argv.push("-o");
process.argv.push("bob");
describe("Generate JWT CLI", () => {
  test("commandLine: ", async () => {
  });

  test("parseArgs: A call with proper args", async () => {
    const argz = parseArgs();
    console.log("OPTIOOOOOOOONHS", argz);
    expect(argz.o).toBe("bob");
  });
});
