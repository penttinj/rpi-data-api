interface ISensorData { // Should return historical data too.
  temperature?: number,
  humidity?: number,
}
export const getData = (query: Object): ISensorData => {
  console.log("sup data");
  return { temperature: 12, humidity: 99 };
};
