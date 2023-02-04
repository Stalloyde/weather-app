import _ from 'lodash';
import append from './append';
import './style.css';

const form = document.querySelector('form');
const backgroundImage = document.querySelector('.bg');
const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.search-result');

backgroundImage.classList.add('sunny');

function clear() {
  const cityOptions = document.querySelectorAll('.city-options');
  searchInput.value = '';
  searchResult.textContent = '';
  cityOptions.forEach((div) => div.remove());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  append.appendCityList();
  clear();
});

export default { clear };
