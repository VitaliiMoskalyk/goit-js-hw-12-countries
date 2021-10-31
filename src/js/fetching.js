export default function fetchingByFullName(dataAPI, name) {
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