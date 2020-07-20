/* eslint-disable no-new */
import mongoose from "mongoose";
import { MONGODB_PW, MONGODB_USER, MONGODB_URL } from ".";

export const initMongo = async () => new Promise((resolve, reject) => {
  const url = `mongodb://localhost/booga`;
  mongoose.connect(
    url,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  )
    .then(() => {
      console.log(`Connected to MongoDB at ${url}`);
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    });
});
