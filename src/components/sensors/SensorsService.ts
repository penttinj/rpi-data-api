import { Sensor, insertData } from "./SensorsModel";

type UnixTime = number;
export interface DataPoint {
  name: string;
  value: number;
  place: string;
  time: UnixTime;
}
interface IHistoricalDataQuery {
  sensors: string | string[];
  count: number;
}
type dataQuery = string | string[] | IHistoricalDataQuery;
type Data = DataPoint[][]; // Is this stupid? :D
type status = "success" | "fail";
interface Response {
  status: status;
  message: string;
}
interface SensorGETResponse extends Response {
  data: Data;
}
interface SensorPOSTResponse extends Response {
  somethingHereMaybe: number;
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
  console.log("getData: ", query);

  if (Array.isArray(query)) {
    console.log("is array");
  }
  switch (typeof query) {
    case "string":
      console.log("is string");
      // Get single sensor from model
      break;
    case "object":
      console.log("is object");
      // Get single or multiple sensors historical data
      // If single, could use same call as string case, function just has optional count arg
      break;
    default:
      // Unhandled case, we bork it
      throw new Error("Unhandled case");
  }
  return {
    status: "success",
    message: "this could say which sensors we got",
    data: mockData,
  };
};

export const parseRequest = async (sensors: string, c?: string) => {
  const parsedSensors = (/,/.test(sensors)) ? sensors.split(",") : sensors;
  if (c) {
    const count = parseInt(c, 10);
    console.log("returning sensors and count");
    return { sensors: parsedSensors, count };
    // eslint-disable-next-line no-else-return
  } else {
    console.log("returning just sensors");
    return parsedSensors;
  }
};

export const postData = async (
  { name, value, place }: RawSensorData,
): Promise<SensorPOSTResponse> => {
  console.log("In post data");
  return new Promise((resolve, reject) => {
    const dataPoint = {
      name,
      value,
      place,
      time: Math.floor(new Date().getTime() / 1000),
    };

    insertData(dataPoint)
      .then((result) => {
        console.log("result:", result);
        resolve({ status: "success", message: "Aw yeah you did it!", somethingHereMaybe: result.time });
      })
      .catch((e) => {
        console.log("Catch block in postData()");
        reject(e);
      });
  });
};
