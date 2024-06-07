import config from './config.js';
import weather from './weather.js';

import formTemplate from './templates/form.html';
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
    const submit = document.querySelector('#search');
    const renderedForm = document.querySelector('form.zip-code-form');
    const zipField = document.querySelector('#zip');
    const unitOfMeasurement = document.querySelector('input[name="unit-of-measurement"]:checked');

    renderedForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      config.zipCode = zipField.value;
      config.unitOfMeasurement = unitOfMeasurement.value;

      console.log(await weather.getWeather());
    })
  }

  const resetDOM = () => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.lastChild);
    }
  }

  return {
    renderForm,
    eventHandlers,
    resetDOM,
  }
})();

export default dom;
