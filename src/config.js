const config = (() => {
  const apiKey = '100612ab215844a98f3194538240306'; // api key is intentionally committed per assignment
  const daysOfForecast = '3'; // 3 days is the limit of WeatherAPI free tier
  const hoursToDisplay = 6;
  let zipCode = '';
  let cityRegion = '';
  let unitOfMeasurement = '';
  let lastUpdatedEpoch = 0;

  return {
    apiKey,
    daysOfForecast,
    zipCode,
    cityRegion,
    unitOfMeasurement,
    hoursToDisplay,
    lastUpdatedEpoch,
  }
})();

export default config;
