interface dataPoint {
  type: string;
  value: number;
  date: Date;
}

interface IHistoricalDataQuery {
  sensors: string | string[];
  count: number;
}

type TData = dataPoint[][]; // Is this stupid? :D
type status = "success" | "fail";
type TResponse = {
  status: status,
  message: string,
  data: TData
};

const hello: dataPoint = {
  type: "erer",
  value: 122,
  date: new Date(),
};

const mockResponse: TData = [
  [hello, hello, hello],
  [hello, hello, hello],
  [hello, hello, hello],
];

type dataQuery = string | string[] | IHistoricalDataQuery;

export const getData = async (query: dataQuery): Promise<TResponse> => {
  console.log("getData: ", query);
  return {
    status: "success",
    message: "this could say which sensors we got",
    data: mockResponse,
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
