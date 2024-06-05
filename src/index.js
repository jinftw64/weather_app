import weather from './weather.js';

function helloWorld() {
  const div = document.createElement('div')

  div.textContent = 'Hello world!';

  document.body.appendChild(div);
}

helloWorld();

const object = await weather.getWeather();
console.log(object.city);
