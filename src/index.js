import _ from 'lodash';
import fetchGeolocationData from './fetch';
import './style.css';

const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.search-result');
const form = document.querySelector('form');
const backgroundImage = document.querySelector('.bg');

backgroundImage.classList.add('sunny');

async function appendGeoLocationData() {
  try {
    const data = await fetchGeolocationData(searchInput.value);
    if (data.length === 0) {
      const div = document.createElement('div');
      div.className = 'search-empty';
      searchResult.appendChild(div);
      div.textContent = 'Your search does not match any city.';
    }
    data.forEach((city) => {
      const div = document.createElement('div');
      div.className = 'city-options';
      searchResult.appendChild(div);
      div.textContent = `${city.name}, ${city.country}`;
    });
  } catch (error) {
    console.log(error);
  }
}

function clear() {
  const cityOptions = document.querySelectorAll('.city-options');
  searchInput.value = '';
  searchResult.textContent = '';
  cityOptions.forEach((div) => div.remove());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  appendGeoLocationData();
  clear();
});
