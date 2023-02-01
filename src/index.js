import _ from 'lodash';
import fetchGeolocationData from './fetch';
import './style.css';

const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
const searchError = document.querySelector('.search-error');
const form = document.querySelector('form');

async function appendGeoLocationData() {
  try {
    const data = await fetchGeolocationData(searchInput.value);
    if (data.length === 0) {
      searchError.textContent =
        'Your search does not match any city. Please try again.';
    }
    data.forEach((city) => {
      const div = document.createElement('div');
      div.className = 'city-options';
      searchContainer.appendChild(div);
      div.textContent = `${city.name}, ${city.country}`;
    });
  } catch (error) {
    console.log(error);
  }
}

function clear() {
  const cityOptions = document.querySelectorAll('.city-options');
  searchInput.value = '';
  searchError.textContent = '';
  cityOptions.forEach((div) => div.remove());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  appendGeoLocationData();
  clear();
});
