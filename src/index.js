import fetchCountries from "./js/fetchCountries";
import debounce from "lodash.debounce";
import {alert, error as notifyError, info as notifyInfo} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const input = document.getElementById('input');
const list = document.getElementById('list');
const country = document.getElementById('country');

input.addEventListener('input', debounce(inputFunction), 300);

function inputFunction(e) {
    e.preventDefault();

    const value = e.target.value.trim();

    
}

function countryAdd() {
    country.innerHTML = `<h1 class="title">${name}</h1>
    <ul class="info_box">
      <li class="info_item"><b>capital:</b>${capital}</li>
      <li class="info_item"><b>population:</b>${population}</li>
      <li class="info_item"><b>languages:</b>${languages}</li>
    </ul>
    <p class="flag">${flags}</p>`
}