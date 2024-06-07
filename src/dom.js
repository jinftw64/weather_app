import config from './config.js';
import weather from './weather.js';

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

  const eventHandlers = () => {
    const renderedForm = document.querySelector('form.zip-code-form');
    const zipField = document.querySelector('#zip');
    const unitOfMeasurement = document.querySelector('input[name="unit-of-measurement"]:checked');

    renderedForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      config.zipCode = zipField.value;
      config.unitOfMeasurement = unitOfMeasurement.value;

      const weatherData = await weather.getWeather();

      resetDOM();
      renderLocationBar(weatherData);
    })
  }

  const resetDOM = () => {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  const renderLocationBar = (someObject) => {
    const locationDiv = document.createElement('div');
    const city = someObject.name;
    const region = someObject.region;

    locationDiv.innerHTML = locationBar;

    container.appendChild(locationDiv);

    const locationInput = document.querySelector('#location');

    locationInput.setAttribute('onfocus', 'this.value=""');
    locationInput.value = `${city}, ${region}`;
  }

  const renderNow = () => {

  }

  return {
    renderForm,
    eventHandlers,
    resetDOM,
  }
})();

export default dom;
