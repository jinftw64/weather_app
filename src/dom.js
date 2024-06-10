import config from './config.js';
import weather from './weather.js';
import handlers from './handlers.js';

import formTemplate from './templates/form.html';
import locationBar from './templates/location-bar.html'
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
    config.cityRegion = `${someObject.name}, ${someObject.region}`;

    locationDiv.innerHTML = locationBar;

    container.appendChild(locationDiv);

    const locationInput = document.querySelector('#location');

    locationInput.value = config.cityRegion;

    handlers.setLocationBar();
  }

  const renderNow = () => {

  }

  return {
    renderForm,
    renderLocationBar,
    resetDOM,
  }
})();

export default dom;
