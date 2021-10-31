import { debounce } from 'lodash';
import './sass/main.scss';
import menuTemplate from './templates/country_template.hbs';
import listTemplate from './templates/countries_list.hbs';



const dataAPI = "https://restcountries.com/v2/name/";


const countryContainerRef = document.querySelector('.country-container');
const inputRef = document.querySelector('.form-control');

inputRef.addEventListener('input',debounce((event) => {searchForLetters(event)},500) );

function searchForLetters(event) {
    const name =event.target.value;
    
    fetchingByFullName(dataAPI,name);
   
}


function fetchingByFullName(dataAPI, name) {
    fetch(`${dataAPI}/${name}`)
        .then(response => response.json())
        .then(country => {
            if (country.length > 1) {
                const arr = [];
                country.forEach((el) => arr.push(el.name));
                countryContainerRef.innerHTML = listTemplate({ arr });
            }
            else countryContainerRef.innerHTML = menuTemplate(...country);
        })
        .catch(() => countryContainerRef.innerHTML = '')
};






