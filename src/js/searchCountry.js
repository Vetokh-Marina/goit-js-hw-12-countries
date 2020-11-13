import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryTmpl from '../templates/countryMarkup.hbs';
import countryList from '../templates/listOfCountry.hbs';
import API from '../js/fetchCountry.js';
import getRefs from './getRefs.js';
import { error } from '@pnotify/core';


const debounce = require('lodash.debounce');

const refs = getRefs();

refs.serchForm.addEventListener('input', debounce(onInput, 500));

function renderCountryCard(country) {
  if (country.length > 10) {
    onError();
    return;
  }
  if (country.length >= 2 && country.length < 10) {
    const listMarkup = countryList(country);

    refs.countryContainer.innerHTML = listMarkup;
    return;
  }
  if (country.length === 1) {
    const markup = countryTmpl(country);
    refs.countryContainer.innerHTML = markup;
    return;
  }
}


function onInput(e) {
  clearSerch();
  const form = e.target;
  const searchQuery = form.value;

  API.fetchCountryofName(searchQuery)
    .then(renderCountryCard)
    .catch(error => {
      console.log(error);
    });
}
function clearSerch() {
  refs.countryContainer.innerHTML = '';
}

function onError() {
  error({
    text: 'To many matches found.Please enter a more specific query!!!'
  });
}
