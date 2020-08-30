#!/usr/bin/env node
/* eslint-disable node/shebang */
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import yargs from "yargs";

interface parsedArgs {
  [x: string]: unknown;
  o: string;
  i: number;
  _: string[];
  $0: string;
}

dotenv.config();
const { JWT_SECRET } = process.env;

export const parseArgs = () => {
  const options = yargs
    .usage("Usage: -o [owner] -i [id]")
    .option("o", {
      alias: "owner", describe: "Token owner's name", type: "string", demandOption: true,
    })
    .option("i", {
      alias: "id", describe: "Id for token owner", type: "number", demandOption: true,
    })
    .argv;
  return options;
};

export const genToken = (options: parsedArgs, secret: string) => {
  try {
    const accessToken = jwt.sign({
      id: options.id,
      owner: options.o,
    }, secret as jwt.Secret, {
      algorithm: 'HS256',
      expiresIn: "8760h",
    });
    return accessToken;
  } catch (e) {
    throw new Error('Token Couldn\'t be created');
  }
};

export const GenerateToken = () => {
  const options = parseArgs();
  const token = genToken(options, JWT_SECRET as string);
  console.log(`${token}`);
};

if (JWT_SECRET) {
  GenerateToken();
} else {
  console.log("No JWT_SECRET env var was found, add it to the .env file");
}
