/* eslint-disable no-new */
import mongoose from "mongoose";
import config from ".";

export const initMongo = async () => new Promise((resolve, reject) => {
  mongoose.connect(
    "mongodb://localhost/mongobongo",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  )
    .then(() => {
      console.log("Connected to MongoDB at <x>");
      resolve(true);
    })
    .catch((err) => {
      reject(err);
    });
});
