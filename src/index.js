import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { error as notifyError } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const input = document.getElementById('input');
const list = document.getElementById('list');
const oneCountry = document.getElementById('oneCountry');

input.addEventListener('input', debounce(inputFunction, 300));

function inputFunction(e) {
  const value = e.target.value.trim();

  if (!value) {
    clearList();
    return;
  }

  fetchCountries(value).then(data => {
    if (data.length > 10) {
      notifyError({
        text: 'too many matches found, please enterr a more specific query!',
        delay: 777,
      });
      clearList();
    } else if (data.length >= 2 && data.length <= 10) {
      addMultipleCounties(data);
    } else if (data.length === 1) {
      addOneCountry(data[0]);
    }
  });
}

function addMultipleCounties(countries) {
  oneCountry.innerHTML = '';
  list.innerHTML = countries
    .map(country => `<li>${country.name.common}</li>`)
    .join('');
}

function addOneCountry(country) {
  list.innerHTML = '';
  oneCountry.innerHTML = `
        <h2>${country.name.common}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
        <img src="${country.flags.svg}" width="200px">
    `;
}

function clearList() {
  list.innerHTML = '';
  oneCountry.innerHTML = '';
}
