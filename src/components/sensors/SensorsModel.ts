import mongoose from "mongoose";
import { SensorData } from "./SensorsService";

export type SensorDocument = mongoose.Document & {
  name: string,
  value: number,
  time: number,
  place: string,
}

const sensorSchema = new mongoose.Schema({
  name: String,
  value: Number,
  time: Number,
  place: String,
}, { timestamps: true });

export const saveSensorData = async (data: SensorData) => {
  console.log("savesensordata");
};

export const Sensor = mongoose.model<SensorDocument>("Sensor", sensorSchema);
