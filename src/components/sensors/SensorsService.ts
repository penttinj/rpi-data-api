import { userInfo } from "os";
import { Sensor } from "./SensorsModel";

type UnixTime = number;
export interface DataPoint {
  name: string;
  value: number;
  place: string;
  time: UnixTime;
}
interface IHistoricalDataQuery {
  sensors: string[];
  count: number;
}
interface IPlacesQuery {
  place: string;
  count?: number;
}
type dataQuery = string[] | IHistoricalDataQuery;
type Data = DataPoint[][]; // Is this stupid? :D
type status = "success" | "fail";
interface Response {
  success: boolean;
  message: string;
}
interface SensorGETResponse extends Response {
  data: Data;
}
interface SensorPOSTResponse extends Response {
  handledSensors: string[];
}
export interface RawSensorData {
  name: string;
  value: number;
  place: string;
}

const hello: DataPoint = {
  name: "erer",
  value: 122,
  place: "Inside",
  time: new Date().getTime(),
};

const mockData: Data = [
  [hello, hello, hello],
  [hello, hello, hello],
  [hello, hello, hello],
];

export const getData = async (query: dataQuery): Promise<SensorGETResponse> => {
  console.log("getData query: ", query);
  const result: DataPoint[][] = [];
  if (Array.isArray(query)) {
    if (query.length === 1) {
      // Get single sensor
      const data = await Sensor.findByName(query);
      console.log("getData single sensoe result:", data);
      result.push(data);
    } else {
      // Get multiple sensors
      const data = await Sensor.findByName(query);
      console.log("getData multiple sensor result:", (data as DataPoint[]).map((v) => v.name));
      result.push(data);
    }
  } else if (typeof query === "object" && (query as IHistoricalDataQuery).count) {
    console.log("is history object");
    const data = await Sensor.findByName(query.sensors, query.count);
    result.push(data);
  }

  if (result.length) {
    console.log("return success");
    return {
      success: true,
      message: `Returned ${result.flat().length} data points`,
      data: result,
    };
  }
  console.log("reached behind all if expressions");
  return {
    success: false,
    message: `Returned: ${result.flat().length} data points`,
    data: result,
  };
};

export const parseRequest = async (sensor: string[] | string, c?: string)
  : Promise<string[] | {sensors: string[], count: number}> => {
  const sensors = Array.isArray(sensor) ? sensor : [sensor];

  if (c) {
    const count = parseInt(c, 10);
    console.log("returning sensors and count");
    return { sensors, count };
    // eslint-disable-next-line no-else-return
  } else {
    console.log("returning just sensors");
    return sensors;
  }
};

export const postData = async (rawData: RawSensorData[]): Promise<SensorPOSTResponse> => {
  console.log("In post data");
  const processedData = rawData.map((el) => ({
    ...el,
    time: Math.floor(new Date().getTime() / 1000),
  }));

  const record = await Sensor.create(processedData);
  return { success: true, message: "Sensors were saved!", handledSensors: record.map((e) => e.name) };
};
