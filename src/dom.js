import config from './config.js';
import handlers from './handlers.js';
import imageMap from './imageMap.js';
import lazyLoadImage from './lazyLoadImage.js';

import formTemplate from './templates/form.html';
import locationBar from './templates/location-bar.html'
import now from './templates/now.html';
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

    config.cityRegion = `${someObject.name}, ${someObject.region}`;

    locationDiv.innerHTML = locationBar;

    container.appendChild(locationDiv);

    const locationInput = document.querySelector('#location');

    locationInput.value = config.cityRegion;

    handlers.setLocationBar();
  }

  const renderNow = (someObject) => {
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

    // test code here
    const iconName = getIconName(someObject.isDay, someObject.week[0].code)
    lazyLoadImage(iconName, icon);

    if (config.unitOfMeasurement === 'fahrenheit') {
      temp.textContent = someObject.week[0].temp_f;
      highTemp.textContent = someObject.week[0].maxtemp_f;
      lowTemp.textContent = someObject.week[0].mintemp_f;
      feelsLike.textContent = someObject.week[0].feelslike_f;
      condition.textContent = someObject.week[0].condition;
    }
  }

  const getIconName = (boolean, code) => {
    const iconName = boolean ? imageMap[code].day.icon : imageMap[code].night.icon

    return iconName;
  }

  return {
    renderForm,
    renderLocationBar,
    resetDOM,
    renderNow,
  }
})();

export default dom;
