import weather from "./weather";
import config from "./config";
import dom from "./dom";

const handlers = (() => {
  const setForm = () => {
    const renderedForm = document.querySelector('form.zip-code-form');
    const zipField = document.querySelector('#zip');

    renderedForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const unitOfMeasurement = document.querySelector('input[name="unit-of-measurement"]:checked');

      config.zipCode = zipField.value;
      config.unitOfMeasurement = unitOfMeasurement.value;

      const weatherData = await weather.getWeather();

      // test code
      console.log(weatherData);
      console.log(config.unitOfMeasurement);

      dom.resetDOM();
      dom.renderLocationBar(weatherData);
      dom.renderNow(weatherData);
      console.log(weatherData.week[0].hours)
      dom.renderBanner(weatherData);
      dom.renderHourly(weatherData.week[0].hours)
      dom.renderWeek(weatherData);
    })
  }

  const setLocationBar = () => {
    const locationInput = document.querySelector('#location');

    // clear input when focus
    locationInput.addEventListener('focus', () => {
      locationInput.value = '';
    })

    // restore value when blur
    locationInput.addEventListener('blur', () => {
      locationInput.value = config.cityRegion;
    })

    locationInput.addEventListener('keydown', async (event) => {
      if (event.keyCode === 13) {

        config.zipCode = locationInput.value;

        const weatherData = await weather.getWeather();

        dom.resetDOM();
        dom.renderLocationBar(weatherData);
      }
    })
  }

  return {
    setForm,
    setLocationBar,
  }
})();

export default handlers;
