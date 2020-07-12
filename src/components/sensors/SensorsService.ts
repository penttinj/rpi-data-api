interface ISensorData { // Should return historical data too.
  temperature?: number;
  humidity?: number;
}

interface IHistoricalData {
  sensors: string | string[];
  count: number;
}

type dataQuery = string | string[] | IHistoricalData;

export const getData = async (query: dataQuery) => {
  console.log("sup data");
  return { temperature: 12, humidity: 19 };
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
