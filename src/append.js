import { indexOf } from 'lodash';
import fetch from './fetch';
import index from './index';

const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.search-result');
const country = document.querySelector('.country');
const currentTemperature = document.querySelector('.temperature');
const currentWeather = document.querySelector('.weather');
const backgroundImage = document.querySelector('.bg');

let searchList;

function closeResults(div) {
  window.addEventListener('click', () => {
    div.remove();
  });
}

function changeBgImage(weather) {
  switch (weather) {
    case 'Clouds':
      backgroundImage.className = '';
      backgroundImage.classList.add('bg');
      backgroundImage.classList.add('cloudy');
      break;
    case 'Clear':
      backgroundImage.className = '';
      backgroundImage.classList.add('bg');
      backgroundImage.classList.add('sunny');
      break;
    case 'Rain':
      backgroundImage.className = '';
      backgroundImage.classList.add('bg');
      backgroundImage.classList.add('rainy');
      break;
    case 'Snow':
      backgroundImage.className = '';
      backgroundImage.classList.add('bg');
      backgroundImage.classList.add('rainy');
      break;
    default:
      backgroundImage.className = '';
      backgroundImage.classList.add('bg');
      backgroundImage.classList.add('sunny');
  }
}

async function appendCityWeather(e) {
  const selectCityIndex = e.target.getAttribute('index');
  const selectedCity = searchList[selectCityIndex];
  const latitude = selectedCity.lat;
  const longitude = selectedCity.lon;
  const weatherData = await fetch.fetchCityWeather(latitude, longitude);

  if (selectedCity.state === undefined) {
    country.textContent = `${selectedCity.name}, ${selectedCity.country}`;
  } else {
    country.textContent = `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}`;
  }

  currentTemperature.textContent = `${weatherData.currentTemperature} °C`;
  currentWeather.textContent = weatherData.currentWeather;

  changeBgImage(weatherData.currentWeather);
}

async function appendCityList() {
  try {
    searchList = await fetch.fetchCityList(searchInput.value);
    if (searchList.length === 0) {
      const div = document.createElement('div');
      div.className = 'search-empty';
      div.textContent = 'Your search does not match any city.';
      searchResult.appendChild(div);
      closeResults(div);
    }
    let x = 0;
    searchList.forEach((city) => {
      const cityListDiv = document.createElement('div');
      cityListDiv.className = 'city-options';
      cityListDiv.setAttribute('index', x);
      x += 1;

      if (city.state === undefined) {
        cityListDiv.textContent = `${city.name}, ${city.country}`;
      } else {
        cityListDiv.textContent = `${city.name}, ${city.state}, ${city.country}`;
      }

      searchResult.appendChild(cityListDiv);
      cityListDiv.addEventListener('click', (div) => {
        appendCityWeather(div);
        index.clear();
      });
      closeResults(cityListDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

export default { appendCityWeather, appendCityList };
