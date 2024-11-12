# project_2
Weather App

Weather App is a web application that allows users to get real-time weather information and a 5-day forecast based on a city name or their current location. The app provides features like temperature unit toggling (Celsius/Fahrenheit), city search with autocomplete, and a sleek, modern design.

Features

City Search: Users can type a city name to get the current weather and a 5-day forecast.
Current Location: Users can retrieve the weather data for their current location.
Unit Toggle: Temperature units can be switched between Celsius and Fahrenheit.
City Suggestions: Auto-suggestions appear as users type the city name.
Weather Icons: Icons display corresponding weather conditions for better visualization.
5-Day Forecast: Displays a daily weather forecast with temperatures and descriptions.
Technologies Used

HTML
CSS (including animations and responsive design)
JavaScript (fetch API, geolocation)
OpenWeatherMap API
Installation

Clone this repository to your local machine.
git clone https://github.com/your-username/weather-app.git
Open the project folder and open index.html in your web browser.
To make the app work, ensure you have an internet connection as it fetches data from OpenWeatherMap API.
Usage

Search for Weather: Enter the name of any city in the search box and press "Search."
Use Current Location: Click on the "Use Current Location" button to get weather information based on your location.
Toggle Temperature Units: Click on the checkbox to switch between Celsius and Fahrenheit.
API

The app uses the OpenWeatherMap API to fetch weather data. You can sign up for a free API key at OpenWeatherMap.

Example API URLs:
Current Weather: https://api.openweathermap.org/data/2.5/weather?q={city}&units={unit}&appid={API_KEY}
5-Day Forecast: https://api.openweathermap.org/data/2.5/forecast?q={city}&units={unit}&appid={API_KEY}
Contributing

Feel free to fork the repository, make changes, and submit pull requests. Please ensure your code follows the coding standards and is well-documented.

License

This project is licensed under the MIT License.
