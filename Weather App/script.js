// API key for OpenWeatherMap, required to send requests to the server
const apiKey = 'db94852b01dce95eeb52bb61c9f72267';
let isCelsius = true; // flag to indicate whether to show temperature in Celsius or Fahrenheit

// This function searches for cities as the user types and provides suggestions
function fetchCitySuggestions() {
    const query = document.getElementById('city').value; // get the text the user entered in the city field
    if (!query) return; // do nothing if the field is empty

    // Make a request to OpenWeatherMap to get a list of cities matching the entered text
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(suggestions => {
            const suggestionsList = document.getElementById('suggestions-list');
            suggestionsList.innerHTML = ''; // clear old suggestions

            // Iterate over each found city and create a list item for it
            suggestions.forEach(city => {
                const listItem = document.createElement('li');
                listItem.textContent = city.name; // city name
                listItem.onclick = () => {
                    // When the user selects a city, insert it into the input field and clear the suggestions list
                    document.getElementById('city').value = city.name;
                    suggestionsList.innerHTML = '';
                };
                suggestionsList.appendChild(listItem); // add the item to the list
            });
        })
        .catch(error => console.error('Error fetching city suggestions:', error)); // display error if something goes wrong
}

// This function retrieves current weather and a 5-day forecast for the specified city
function getWeather() {
    const city = document.getElementById('city').value; // get the city name entered by the user
    if (!city) {
        alert('Please enter a city'); // ask to enter a city if the field is empty
        return;
    }

    const unit = isCelsius ? 'metric' : 'imperial'; // choose temperature unit
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching current weather data. Please try again.'));

    // Fetch 5-day weather forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => alert('Error fetching forecast data. Please try again.'));
}

// This function displays the current weather on the screen
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    tempDivInfo.innerHTML = ''; // clear temperature information
    weatherInfoDiv.innerHTML = ''; // clear main weather information

    // If the city is not found, show an error message
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        // Extract necessary data from the response
        const temperature = Math.round(data.main.temp); // round temperature to whole number
        const description = data.weather[0].description; // weather description
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`; // weather icon

        // Fill page elements with data
        tempDivInfo.innerHTML = `<p>${temperature}°${isCelsius ? 'C' : 'F'}</p>`;
        weatherInfoDiv.innerHTML = `
            <p><strong>${data.name}</strong></p>
            <p>${description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} ${isCelsius ? 'm/s' : 'mph'}</p>`;
        weatherIcon.src = iconUrl; // set the icon
        weatherIcon.alt = description;
        weatherIcon.style.display = 'block'; // display the icon
    }
}

// This function displays the 5-day weather forecast
function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h3>5-Day Forecast</h3>';

    // Filter forecast data to select noon data for each day
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
        const tempMin = Math.round(item.main.temp_min);
        const tempMax = Math.round(item.main.temp_max);
        const description = item.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        // Add forecast data for each day to HTML
        forecastDiv.innerHTML += `
            <div class="forecast-item">
                <p>${day}</p>
                <img src="${iconUrl}" alt="${description}">
                <p>${tempMax}° / ${tempMin}° ${isCelsius ? 'C' : 'F'}</p>
                <p>${description}</p>
            </div>`;
    });
}

// This function fetches the weather for the user's current location
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const unit = isCelsius ? 'metric' : 'imperial';
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

            // Fetch current weather for user's coordinates
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching weather data');
                    }
                    return response.json();
                })
                .then(data => displayWeather(data))
                .catch(error => alert('Error fetching data: ' + error.message));
        }, error => {
            alert('Unable to retrieve location: ' + error.message);
        });
    } else {
        alert('Your browser does not support geolocation.');
    }
}

// This function toggles the temperature unit and updates the data
function toggleUnit() {
    isCelsius = !isCelsius; // toggle flag
    getWeather(); // refresh weather with new unit
}
