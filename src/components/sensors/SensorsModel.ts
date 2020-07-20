import mongoose from "mongoose";
import { DataPoint } from "./SensorsService";

export type SensorDocument = mongoose.Document & {
  name: string,
  value: number,
  time: number,
  place: string,
}

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  value: Number,
  time: Number,
  place: {
    type: String,
    lowercase: true,
  },

}, { timestamps: true });

export const Sensor = mongoose.model<SensorDocument>("Sensor", sensorSchema);

export const insertData = async (data: DataPoint) => {
  console.log("insertDataing...");
  const sensor = new Sensor(data);

  return sensor
    .save()
    .then((result) => result)
    .catch((e) => {
      console.log("Catch block in insertData()");
      throw new Error(e);
    });
};
