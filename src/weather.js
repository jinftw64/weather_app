import config from "./config";

const weather = (() => {
  const getResponseJson = async () => {
    const currentURL = `https://api.weatherapi.com/v1/forecast.json?`
      + `key=${config.apiKey}`
      + `&q=${config.zipCode}`
      + `&days=${config.daysOfForecast}`;

    const response = await fetch(currentURL);
    const weatherData = await response.json();

    console.log(weatherData);
    return weatherData;
  }

  // current day requires different deserialization vs forecast day
  const createNow = (someObject) => {
    const now = {
      date: someObject.current.last_updated,
      temp_c: someObject.current.temp_c,
      temp_f: someObject.current.temp_f,
      feelslike_c: someObject.current.feelslike_c,
      feelslike_f: someObject.current.feelslike_f,
      maxtemp_c: someObject.forecast.forecastday[0].day.maxtemp_c,
      maxtemp_f: someObject.forecast.forecastday[0].day.maxtemp_f,
      mintemp_c: someObject.forecast.forecastday[0].day.mintemp_c,
      mintemp_f: someObject.forecast.forecastday[0].day.mintemp_f,
      condition: someObject.current.condition.text,
      code: someObject.current.condition.code,
    }

    return now;
  }

  const createDay = (someObject) => {
    const day = {
      date: someObject.date,
      maxtemp_c: someObject.day.maxtemp_c,
      maxtemp_f: someObject.day.maxtemp_f,
      mintemp_c: someObject.day.mintemp_c,
      mintemp_f: someObject.day.mintemp_f,
      avgtemp_c: someObject.day.avgtemp_c,
      avgtemp_f: someObject.day.avgtemp_f,
      condition: someObject.day.condition.text,
      code: someObject.day.condition.code,
    }

    return day;
  }

  const processJson = (someJson) => {
    const forecastday = someJson.forecast.forecastday;
    const name = someJson.location.name;
    const region = someJson.location.region;
    const week = {};

    for (const dayNum in forecastday) {
      // create today object if index is 0 otherwise create forecast day
      if (dayNum == '0') {
        week[dayNum] = createNow(someJson);
      } else {
        week[dayNum] = createDay(forecastday[dayNum]);
      }
    }

    return {
      name,
      region,
      week,
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
