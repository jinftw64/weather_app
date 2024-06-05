const weather = (() => {
  const apiKey = '100612ab215844a98f3194538240306';
  let zipCode = '11726';

  const getResponseJson = async () => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`;
    const response = await fetch(url);
    const weatherData = await response.json();

    console.log(weatherData);
    return weatherData;
  }

  const processJson = (someJson) => {
    const city = someJson.location.name;
    const state = someJson.location.region;
    const timeDate = someJson.location.localtime;

    return {
      city,
      state,
      timeDate,
    }
  }

  const getWeather = async () => {
    const response = await getResponseJson();

    return processJson(response);
  }

  return {
    getWeather,
  }
})();

export default weather;
