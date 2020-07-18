import mongoose from "mongoose";

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

export const Sensor = mongoose.model<SensorDocument>("Sensor", sensorSchema);
