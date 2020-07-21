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
    required: true,
    lowercase: true,
  },
  value: {
    type: Number,
    required: true,
  },
  place: {
    type: String,
    required: true,
    lowercase: true,
  },
  time: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const Sensor = mongoose.model<SensorDocument>("Sensor", sensorSchema);
