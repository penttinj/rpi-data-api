import mongoose, { Query } from "mongoose";
import { DataPoint } from "./SensorsService";
import { HTTP404Error, HTTP400Error } from "../../utils/httpErrors";

export type SensorDocument = mongoose.Document & {
  name: string,
  value: number,
  place: string,
  time: number,

  // findAllByPlace(): string[], <-- This would be here if it was a method, not static
}

export type SensorModel = mongoose.Model<SensorDocument> & {
  /**
   * Return all sensors that reside in the specified place.
   * @param place Somewhere like inside or outside
   */
  findByPlace(place: string): Promise<DataPoint[]>,
  /**
   * Return sensors with the matched name.
   * Accepts string of one sensor or array of sensor names.
   * @param name Sensor name or array of names.
   */
  findByName(name: string | string[], count?: number): Promise<DataPoint[]>
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

sensorSchema.statics.findByPlace = async function findByPlace(
  place: string,
): Promise<DataPoint[]> {
  return this.find({ place }, (err: Error, docs: SensorDocument[]) => docs);
};
sensorSchema.statics.findByName = async function findByName(
  names: string[], limit = 1,
): Promise<DataPoint[]> {
  console.log("findByName: ", names);
  const result = await Promise.all(
    names.map(async (sensorName): Promise<DataPoint> => this.find({ name: sensorName }).limit(limit)
      .then(([doc]: SensorDocument[]) => {
        if (doc === undefined) {
          throw new HTTP404Error(`Sensor wasn't (yet) found in database: ${sensorName}`);
        }
        const {
          name, value, place, time,
        } = doc;
        return {
          name, value, place, time,
        };
      })),
  );
  console.log("docz: ", result);
  return result;
};

export const Sensor = mongoose.model<SensorDocument, SensorModel>("Sensor", sensorSchema);
