# project_2
Recipe App

Description

The Recipe App is a web application that provides users with an easy-to-use interface for searching and viewing recipes for a variety of dishes. Users can search for recipes by name, view detailed recipe information, add favorite recipes to a favorites list, and explore random recipes on page load.

Features

Recipe Search – Allows users to search for recipes by keywords with an auto-suggest feature.
Random Recipes – Displays a selection of random recipes upon page load.
Recipe Details – Provides detailed information on each recipe, including ingredients, instructions, and nutritional information in a modal.
Favorites – Enables users to save and manage a list of favorite recipes, stored locally in the browser.
Responsive Design – Ensures an optimized experience across various devices.
Technologies Used

HTML, CSS, JavaScript – Core technologies for structure, styling, and interactivity.
Bootstrap 5 – For responsive and styled UI components.
Spoonacular API – Used for retrieving recipe data, including search results, details, and random recipes.
Installation

Clone this repository to your local machine:
git clone https://github.com/yourusername/recipe-app.git
Navigate to the project directory:
cd recipe-app
Open index.html in your preferred browser to view the app.
Usage

Open the app in a browser.
Type a dish name in the search bar to view suggestions.
Select a suggested recipe or click Search to see results.
Click View Details on a recipe card to view ingredients, instructions, and nutritional information.
Add recipes to Favorites by clicking the Add to Favorites button.
Access favorite recipes in the Favorites section.
API Key Setup

To use the Spoonacular API, replace the placeholder in script.js with your actual Spoonacular API key:

const apiKey = 'YOUR_SPOONACULAR_API_KEY';
License

This project is licensed under the MIT License.

---------------------------------------------------------------------------------
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

--------------------------------------------------------------------------------
Movie App

A responsive Movie App built with HTML, CSS, and JavaScript that allows users to search for movies, view details, and manage a watchlist. This app uses The Movie Database (TMDb) API to fetch and display movie data.

Features

Search Functionality: Users can search for movies by title.
Sort Options: Sort movies by popularity, release date, or rating.
Movie Details Modal: Display detailed information, including an overview, release date, rating, runtime, and main cast.
Watchlist: Users can save movies to their watchlist and manage saved movies.
Pagination: Easily navigate through pages of movie results.
Local Storage: The watchlist persists even after the page is reloaded.
Screenshots

Include any relevant screenshots here to showcase the UI.

Installation

Clone this repository:
git clone https://github.com/username/movie-app.git
Navigate to the project directory:
cd movie-app
Open the index.html file in your browser to start the app.
API Key

This project uses The Movie Database (TMDb) API. To use this app, you need an API key from TMDb.

Sign up or log in to TMDb.
Go to your account settings and navigate to the API section.
Generate a new API key and copy it.
Replace the placeholder in the script.js file with your API key:
const API_KEY = 'your_api_key_here';
Usage

Search for Movies: Enter a movie name in the search bar to find related titles.
Sort Movies: Use the dropdown to sort movies by popularity, release date, or rating.
View Movie Details: Click on a movie to open a modal displaying detailed information.
Add to Watchlist: In the movie details modal, click "Add to Watchlist" to save the movie.
Manage Watchlist: Access and manage your saved movies in the watchlist modal.
Technologies Used

HTML, CSS, JavaScript
TMDb API for movie data
License

This project is licensed under the MIT License.

