// API
const URL = 'https://restcountries.com/v3.1/all';

const countryTemplate = document.getElementById('country-template');
const searchCountry = document.getElementById('search-country');
const region = document.getElementById('regions');
const changeMode = document.querySelector('.change-mode');
let data = [];
let AllCountries = []
let isDarkMode = false


// country page 
const countryPage = document.querySelector(".country-page")
const backButton = document.querySelector(".back-button")
const countryDetailsPage = document.querySelector(".country-details-page")
const countryDetailsImage = document.querySelector(".country-details-image")
const countryDetailsName = document.querySelector(".country-details-name")
const countryDetailsNativeName = document.querySelector(".country-details-native-name")
const countryDetailsPopulation = document.querySelector(".country-details-population")
const countryDetailsRegion = document.querySelector(".country-details-region")
const countryDetailsCapital = document.querySelector(".country-details-capital")
const countryDetailsDomain = document.querySelector(".country-details-domain")
const countryDetailsCurrencies = document.querySelector(".country-details-currencies")
const countryDetailsLanguage = document.querySelector(".country-details-languages")
const countryDetailsBorder = document.querySelector(".country-details-border")

// Dark and light Mode
const header = document.querySelector('.header');
const searchSection = document.querySelector('.search-section');
const countriesSection = document.getElementById('countries-section');
const countryDetailsForDarkMode = document.querySelectorAll(".country-details");

// Fetch data from API
async function fetchData() {
	const response = await fetch(URL);
	data = await response.json();
	//show All Countries in DOM
	AllCountries = data
	showCountries(data);
}



//Show All Countries
function showCountries(data) {
	console.log(data)
	data.map(country => {
		countryPage.classList.add("hide")

		const cardDiv = document.createElement("div")
		cardDiv.classList.add('card')

		cardDiv.addEventListener ('click', () => {
			countryDetails(country)
		})

		const img = document.createElement('img');
		img.classList.add('country-flag')
		img.alt= country.name.common
		img.src=country.flags.svg

		const div = document.createElement('div');
		div.classList.add('country-details')

		const h4 = document.createElement('h4');
		h4.classList.add("country-name")
		h4.innerText = country.name.common

		const pRegion = document.createElement('p');
		pRegion.classList.add("country-region")
		pRegion.innerText = `Region: ${country.region}`

		const pPopulation = document.createElement('p');
		pPopulation.classList.add("country-population")
		pPopulation.innerText = `population: ${country.population.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")}`

		const pCapital = document.createElement('p');
		pCapital.classList.add("country-capital")
		pCapital.innerText = `Capital: ${country.capital}`

		cardDiv.appendChild(img)
		cardDiv.appendChild(div)
		div.appendChild(h4)
		div.appendChild(pRegion)
		div.appendChild(pPopulation)
		div.appendChild(pCapital)

		countryTemplate.appendChild(cardDiv)
	})
}

//search for country
	function searchedCountries(e) {
		const searchValue = e.target.value.trim()
		countryTemplate.innerHTML = ''
		if (searchValue.length > 0) {
			const filteredCountries = data.filter(country => {
				return country.name.common.toLowerCase().includes(searchValue.toLowerCase())
			})
			showCountries(filteredCountries)
			
		} else {
			data = AllCountries
		}

		if (isDarkMode) {
			document.querySelectorAll('.card').forEach(card => {
				card.classList.add('dark-bg');
			});
			document.querySelectorAll('.country-details').forEach(card => {
				card.classList.add('white-font');
			});
		}
	}	
	
//Filtered by region
function filterByRegion(e) {
	let selectedRegion = e.target.value.toLowerCase()
	if (selectedRegion !== 'all') {
		countryTemplate.innerHTML = ''
		const regionalCountries = data.filter(country => {
			return country.region.toLowerCase() === selectedRegion
		})
		showCountries(regionalCountries)
		
	} else {
		showCountries(data)
		
	}

	if (isDarkMode) {
		document.querySelectorAll('.card').forEach(card => {
			card.classList.add('dark-bg');
		});
		document.querySelectorAll('.country-details').forEach(card => {
			card.classList.add('white-font');
		});
	}
}

// countries details by clicking on it
function countryDetails(country) {
	//Show and Hide part of the page
	countryPage.classList.remove("hide")
	countriesSection.classList.add('hide')
	searchSection.classList.add('hide')
	// Insert Country Details
	countryDetailsName.innerText = country.name.common
	countryDetailsImage.src = country.flags.svg
	countryDetailsPopulation.innerText = country.population.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")
	countryDetailsRegion.innerText = country.region
	countryDetailsCapital.innerText = country.capital
	countryDetailsCurrencies.innerText = Object.values(country.currencies)[0].name
	countryDetailsLanguage.innerText = Object.values(country.languages)[0]
	// Border Countries
	countryDetailsBorder.innerHTML = ""
	country.borders ? country.borders.forEach(country => {
		const countryName = data.find(country2 => {
			if (country2.cca3 === country) {
				return country2
			}
		})
		const span = document.createElement("span")
		span.innerText = `${countryName.name.common} ${countryName.flag}`
		span.classList.add("border-country")
		countryDetailsBorder.appendChild(span)
	}) 
	: countryDetailsBorder.innerHTML = 'No Data for border countries'
}

//Dark mode Function 
function darkMode() {
	if (!isDarkMode) {
		document.body.classList.add("very-dark-bg")
		document.body.classList.add("white-font")
		header.classList.add("white-font")
		header.classList.add("dark-bg")
		searchSection.classList.add("white-font")
		searchSection.classList.add("very-dark-bg")
		countriesSection.classList.add("white-font")
		countriesSection.classList.add("very-dark-bg")
		searchCountry.classList.add("white-font")
		searchCountry.classList.add("dark-bg")
		document.querySelectorAll('.card').forEach(card => {
			card.classList.add('dark-bg');
		});
		document.querySelectorAll('.country-details').forEach(card => {
			card.classList.add('white-font');
		});
		backButton.classList.add("white-font")
		backButton.classList.add("dark-bg")
	
		document.querySelectorAll('.border-country').forEach(card => {
			card.classList.add('white-font');
			card.classList.add('dark-bg');
		})
		region.classList.add("white-font")
		region.classList.add("dark-bg")
	} else {
		document.body.classList.remove("very-dark-bg")
		document.body.classList.remove("white-font")
		header.classList.remove("white-font")
		header.classList.remove("dark-bg")
		searchSection.classList.remove("white-font")
		searchSection.classList.remove("very-dark-bg")
		countriesSection.classList.remove("white-font")
		countriesSection.classList.remove("very-dark-bg")
		searchCountry.classList.remove("white-font")
		searchCountry.classList.remove("dark-bg")
		document.querySelectorAll('.card').forEach(card => {
			card.classList.remove('dark-bg');
		});
		document.querySelectorAll('.country-details').forEach(card => {
			card.classList.remove('white-font');
		});
		backButton.classList.remove("white-font")
		backButton.classList.remove("dark-bg")
	
		document.querySelectorAll('.border-country').forEach(card => {
			card.classList.remove('white-font');
			card.classList.remove('dark-bg');
		})
		region.classList.remove("white-font")
		region.classList.remove("dark-bg")
	}
}

//Events
// Search
searchCountry.addEventListener('keyup', (e) => {
	searchedCountries(e)
	
})
//Filter by Region
region.addEventListener('change', (e) => {
	searchCountry.value = ''
	filterByRegion(e)
	
})
//Dark Mode
changeMode.addEventListener('click', () => {
	darkMode()
	isDarkMode =!isDarkMode
})
// Back Button
backButton.addEventListener('click', () => {
	countryPage.classList.add("hide")
	countriesSection.classList.remove('hide')
	searchSection.classList.remove("hide")
})
// Fetch data on DOM content load
window.addEventListener('load', fetchData);

