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
    config.lastUpdatedEpoch = weatherData.current.last_updated_epoch;
    return weatherData;
  }

  const epochToEST = (epochNumber) => {
    return (epochNumber % 86400 / 3600) - 4;
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
      hours: getFutureHours(config.lastUpdatedEpoch, someObject.forecast.forecastday[0].hour, config.hoursToDisplay)
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
      hours: getFutureHours(config.lastUpdatedEpoch, someObject.hour, config.hoursToDisplay)
    }

    return day;
  }

  const getFutureHours = (epochTime, responseHourArray, hoursToDisplay) => {
    const currentTimein24hr = Math.ceil(epochToEST(epochTime));
    const endTimein24hr = currentTimein24hr + hoursToDisplay;

    const slicedHourArray = responseHourArray.slice(currentTimein24hr, endTimein24hr);

    const allHours = [];

    const createHour = (someHour) => {
      const newHour = {};

      newHour.time_epoch = someHour.time_epoch;
      newHour.temp_c = someHour.temp_c;
      newHour.temp_f = someHour.temp_f;
      newHour.code = someHour.condition.code;

      return newHour;
    }

    for (const currentHour of slicedHourArray) {
      const hour = createHour(currentHour);
      allHours.push(hour);
    }

    return allHours;
  }

  const processJson = (someJson) => {
    const forecastday = someJson.forecast.forecastday;
    const name = someJson.location.name;
    const region = someJson.location.region;
    const localtime_epoch = someJson.location.localtime_epoch;
    const isDay = isDaytime(localtime_epoch);
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
      localtime_epoch,
      isDay,
      week,
    }
  }

  const isDaytime = (epoch) => {
    const hours = new Date(epoch).getHours();

    return (hours > 6 && hours < 20);
  }

  const epochTo12Hour = (epoch) => {
    const date = new Date(epoch * 1000);
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = hours + ' ' + amOrPm;

    return timeString;
  }

  const getWeather = async () => {
    const response = await getResponseJson();

    return processJson(response);
  }

  return {
    getWeather,
    epochToEST,
    epochTo12Hour,
    isDaytime,
  }
})();

export default weather;
