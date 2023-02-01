import _ from 'lodash';
import fetchGeolocationData from './fetch';
import './style.css';

const searchInput = document.getElementById('search-input');
const form = document.querySelector('form');

async function appendGeoLocationData() {
  await fetchGeolocationData(searchInput.value).then((data) =>
    data.forEach((city) => {
      const div = document.createElement('div');
      div.className = 'city-options';
      document.body.appendChild(div);
      div.textContent = `${city.name}, ${city.country}`;
    })
  );
}

function clear() {
  const cityOptions = document.querySelectorAll('.city-options');
  searchInput.value = '';
  cityOptions.forEach((div) => div.remove());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  appendGeoLocationData();
  clear();
});
