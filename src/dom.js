import config from './config.js';
import weather from './weather.js';
import handlers from './handlers.js';
import imageLoad from './imageLoad.js';

import formTemplate from './templates/form.html';
import locationBar from './templates/location-bar.html'
import now from './templates/now.html';
import hourlyHTML from './templates/hourly.html';
import hourHTML from './templates/hour.html';
import dayHTML from './templates/day.html';
import weekHTML from './templates/week.html';
import './style.css';

const dom = (() => {
  const container = document.querySelector('.container');

  const renderForm = () => {
    const form = document.createElement('form');
    form.className = 'zip-code-form';
    form.innerHTML = formTemplate;

    container.appendChild(form);
  }

  const resetDOM = () => {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  const renderLocationBar = (someObject) => {
    const locationDiv = document.createElement('div');

    locationDiv.classList.add('location-bar', 'panel');
    locationDiv.innerHTML = locationBar;
    container.appendChild(locationDiv);

    config.cityRegion = `${someObject.name}, ${someObject.region}`;

    const locationInput = document.querySelector('#location');

    locationInput.value = config.cityRegion;

    handlers.setLocationBar();
  }

  const renderNow = (someObject) => {
    // create now div and render
    const nowDiv = document.createElement('div');

    nowDiv.classList.add('panel', 'now');
    nowDiv.innerHTML = now;

    container.appendChild(nowDiv);

    const temp = document.querySelector('.now .temp');
    const highTemp = document.querySelector('.now .high');
    const lowTemp = document.querySelector('.now .low');
    const feelsLike = document.querySelector('.now .feels-like');
    const condition = document.querySelector('.now .condition');
    const icon = document.querySelector('.now .icon');

    // lookup code and render icon
    icon.src = imageLoad.renderIcon(someObject.isDay, someObject.week[0].code);

    // set api response values to elements
    condition.textContent = someObject.week[0].condition;

    if (config.unitOfMeasurement === 'fahrenheit') {
      temp.textContent = Math.ceil(someObject.week[0].temp_f);
      highTemp.textContent = `High: ${Math.ceil(someObject.week[0].maxtemp_f)}`;
      lowTemp.textContent = `Low: ${Math.ceil(someObject.week[0].mintemp_f)}`;
      feelsLike.textContent = `Feels like ${Math.ceil(someObject.week[0].feelslike_f)}`;
    } else if (config.unitOfMeasurement === 'celsius') {
      temp.textContent = Math.ceil(someObject.week[0].temp_c);
      highTemp.textContent = `High: ${Math.ceil(someObject.week[0].maxtemp_c)}`;
      lowTemp.textContent = `Low: ${Math.ceil(someObject.week[0].mintemp_c)}`;
      feelsLike.textContent = `Feels like ${Math.ceil(someObject.week[0].feelslike_c)}`;
    }
  }

  const getIconName = (boolean, code) => {
    const iconName = boolean ? imageMap[code].day.icon : imageMap[code].night.icon

    return iconName;
  }

  const getBannerName = (boolean, code) => {
    const bannerFolder = boolean ? imageLoad.imageMap[code].day.banner_folder : imageLoad.imageMap[code].night.banner_folder

    return bannerFolder;
  }

  const renderBanner = (someObject) => {
    const bannerPath = getBannerName(someObject.isDay, someObject.week[0].code);
    const bannerDiv = document.createElement('div');
    const bannerImg = document.createElement('img');
    const folderContext = imageLoad.folderContexts[bannerPath];

    bannerDiv.classList.add('panel', 'banner');
    bannerDiv.appendChild(bannerImg);

    bannerImg.src = imageLoad.getRandomImage(folderContext);

    container.appendChild(bannerDiv);
  }

  const renderHour = () => {
    const hourDiv = document.createElement('div');

    hourDiv.classList.add('hour');
    hourDiv.innerHTML = hourHTML;

    return hourDiv;
  }

  const renderHourly = (someHourArray) => {
    const hourlyDiv = document.createElement('div');

    hourlyDiv.classList.add('panel', 'hourly');
    hourlyDiv.innerHTML = hourlyHTML;

    container.appendChild(hourlyDiv);

    const hoursDiv = document.querySelector('.hours');

    for (let i = 0; i < someHourArray.length; i++) {
      const someHourObject = someHourArray[i];
      const currentHourDiv = renderHour();

      hoursDiv.appendChild(currentHourDiv);

      const tempDiv = currentHourDiv.getElementsByClassName('temp')[0];
      const iconDiv = currentHourDiv.getElementsByClassName('icon')[0];
      const timeDiv = currentHourDiv.getElementsByClassName('time-in-hour')[0];

      if (config.unitOfMeasurement === 'fahrenheit') {
        tempDiv.innerText = Math.ceil(someHourObject.temp_f);
      } else if (config.unitOfMeasurement === 'celsius') {
        tempDiv.innerText = Math.ceil(someHourObject.temp_c);
      }

      const isCurrentHourDaytime = weather.isDaytime(someHourObject.time_epoch);

      iconDiv.src = imageLoad.renderIcon(isCurrentHourDaytime, someHourObject.code);

      timeDiv.innerText = i === 0 ? 'Now' : weather.epochTo12Hour(someHourObject.time_epoch);
    }
  }

  const renderDay = (someDayObject, index) => {
    const dayDiv = document.createElement('div');

    dayDiv.classList.add('day', `day-${index}`);
    dayDiv.innerHTML = dayHTML;

    const nameOfDayDiv = dayDiv.getElementsByClassName('name-of-day')[0];
    const iconDiv = dayDiv.getElementsByClassName('icon')[0];
    let highTemp = '';
    let lowTemp = '';
    const highLowDiv = dayDiv.getElementsByClassName('high-and-low')[0];

    nameOfDayDiv.innerText = weather.epochToDayNum(someDayObject.date_epoch);

    iconDiv.src = imageLoad.renderIcon(true, someDayObject.code);

    if (config.unitOfMeasurement === 'fahrenheit') {
      highTemp = Math.ceil(someDayObject.maxtemp_f)
      lowTemp = Math.ceil(someDayObject.mintemp_f)
    } else if (config.unitOfMeasurement === 'celsius') {
      highTemp = Math.ceil(someDayObject.maxtemp_c)
      lowTemp = Math.ceil(someDayObject.mintemp_c)
    }

    highLowDiv.innerText = `${highTemp} / ${lowTemp}`;

    return dayDiv;
  }

  const renderWeek = (someObject) => {
    const week = document.createElement('div');

    week.classList.add('panel', 'week');
    week.innerHTML = weekHTML;

    container.appendChild(week);

    for (const index in someObject.week) {
      const currentDay = renderDay(someObject.week[index], index);

      week.appendChild(currentDay);
    }

    container.appendChild(week);
  }

  return {
    renderForm,
    renderLocationBar,
    resetDOM,
    renderNow,
    renderBanner,
    renderHourly,
    renderWeek,
  }
})();

export default dom;
