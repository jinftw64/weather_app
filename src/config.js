const config = (() => {
  const apiKey = '100612ab215844a98f3194538240306'; // api key is intentionally committed per assignment
  const daysOfForecast = '3'; // 3 days is the limit of WeatherAPI free tier
  let zipCode = '';
  let unitOfMeasurement = '';

  return {
    apiKey,
    daysOfForecast,
    zipCode,
    unitOfMeasurement,
  }
})();

export default config;
