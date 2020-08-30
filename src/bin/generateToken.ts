#!/usr/bin/env node
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import yargs from "yargs";

dotenv.config();
const { JWT_SECRET } = process.env;


export const parseArgs = () => {
  console.log("pr0cess:", process.argv);
  const options = yargs
    .usage("Usage: -n <name>")
    .option("o", {
      alias: "owner", describe: "Token owner's name", type: "string", demandOption: true,
    })
    .argv;
  console.log("pr0cess:", process.argv);
  console.log("options:", options);
  return options;
};

export const genToken = () => {

};

export const createToken = () => {
  try {
    const id = 321;

    const accessToken = jwt.sign({ userId: id }, JWT_SECRET as jwt.Secret, {
      algorithm: 'HS256',
      expiresIn: "7d",
    });
    console.log("Access Token Generated: ", accessToken);
    return accessToken;
  } catch (e) {
    throw new Error('Token Couldn\'t be created');
  }
};

export const commandLine = () => {
  parseArgs();
};

commandLine();
