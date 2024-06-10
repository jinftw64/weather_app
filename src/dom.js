import config from './config.js';
import handlers from './handlers.js';

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

    temp.textContent = someObject.week[0].temp_f;
  }

  return {
    renderForm,
    renderLocationBar,
    resetDOM,
    renderNow,
  }
})();

export default dom;
