import { debounce } from 'lodash';
import './sass/main.scss';
import menuTemplate from './templates/country_template.hbs';
import listTemplate from './templates/countries_list.hbs';

import { error,alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
//*findFistNElemOfArray* get 2 parameters- array & number of elements,
//which you want to return
import findFistNElemOfArray from './js/findFirstElem';



const dataAPI = "https://restcountries.com/v2/name/";

const countryContainerRef = document.querySelector('.country-container');
const inputRef = document.querySelector('.form-control');

inputRef.addEventListener('input',debounce((event) => {searchForLetters(event)},500));

function searchForLetters(event) {
    const name =event.target.value;
    fetchingByFullName(dataAPI,name); 
}

function clearInput() {
    document.getElementById("textInput").value = "";
}

function fetchingByFullName(dataAPI, name) {
    fetch(`${dataAPI}/${name}`)
        .then(response => response.json())
        .then(country => {
            if (country.length > 1) {
                console.dir(country)
                const arr = findFistNElemOfArray(country,10);
                countryContainerRef.innerHTML = listTemplate({ arr });
            }
            if (country.length >= 10) notice(); 
            
            if (country.length == 1) { countryContainerRef.innerHTML = menuTemplate(...country); clearInput()}
        
            if (country.message === 'Not Found') { countryContainerRef.innerHTML = ''; warning(); clearInput() }
            
            if (country.message === "Page Not Found") countryContainerRef.innerHTML = '';
        })
        
        .catch(() => { countryContainerRef.innerHTML = '';});
};


// pnotify from https://github.com/sciactive/pnotify
function notice() {
    alert({
        title: false,
        text: 'Too many matches found. Please enter a more specific query!',
        shadow: true,
        sticker: false,
        delay: 2000,

    })
};
function warning() {
    error({
        title: false,
        text: 'Countries not found!',
        shadow: true,
        sticker: false,
        delay: 2000,

    })
};