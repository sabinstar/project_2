const API_KEY = '1cf50e6248dc270629e802686245c2c8'; // API key for accessing The Movie Database
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for The Movie Database API
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // URL for fetching movie posters
const PAGE_SIZE = 20; // Number of movies per page

let currentPage = 1; // Current page of movies
let totalPages = 1; // Total number of pages for movie results
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Load watchlist from localStorage, or initialize as empty array
let currentSort = 'popularity.desc'; // Default sorting by popularity

// DOM elements
const main = document.getElementById('main'); // The main content area where movies will be displayed
const form = document.getElementById('form'); // The search form
const search = document.getElementById('search'); // The search input field
const modal = document.getElementById('movie-modal'); // The movie modal
const closeModal = document.getElementById('close-modal'); // Close button for the movie modal
const movieDetails = document.getElementById('movie-details'); // Area to show movie details in the modal
const watchlistContainer = document.getElementById('watchlist'); // The watchlist container
const watchlistModal = document.getElementById('watchlist-modal'); // The watchlist modal
const openWatchlistButton = document.getElementById('open-watchlist'); // Button to open the watchlist modal
const closeWatchlistModal = document.getElementById('close-watchlist-modal'); // Close button for the watchlist modal
const prevPageButton = document.getElementById('prev-page'); // Button to go to the previous page
const nextPageButton = document.getElementById('next-page'); // Button to go to the next page
const sortBySelect = document.getElementById('sort-by'); // Sort by dropdown

// Function to get movies from the API
function getMovies(url) {
    fetch(url)
        .then(res => res.json()) // Convert response to JSON
        .then(data => {
            totalPages = data.total_pages; // Set total pages from the response
            currentPage = data.page; // Set current page from the response
            showMovies(data.results); // Display the movies on the page
        });
}

// Function to display movies on the page
function showMovies(movies) {
    main.innerHTML = ''; // Clear the main content area
    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date, id } = movie; // Destructure movie data
        const movieEl = document.createElement('div'); // Create a new movie element
        movieEl.classList.add('movie'); // Add class to style the movie element
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : 'http://via.placeholder.com/500x750'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <p>Release Date: ${release_date}</p>
        `;
        movieEl.addEventListener('click', () => openMovieModal(id)); // Add event listener to open movie modal on click
        main.appendChild(movieEl); // Append the movie element to the main section
    });
}

// Function to open the movie modal and show movie details
function openMovieModal(movieId) {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,reviews,videos`)
        .then(res => res.json()) // Fetch movie details, credits, reviews, and videos
        .then(movie => {
            movieDetails.innerHTML = `
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <p><strong>Rating:</strong> ${movie.vote_average}</p>
                <p><strong>Duration:</strong> ${movie.runtime} min</p>
                <p><strong>Cast:</strong> ${movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <button class="watchlist-button" onclick="toggleWatchlist(${movieId})">
                    ${watchlist.includes(movieId) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
            `;
            modal.style.display = 'block'; // Show the modal
        });
}

// Function to add/remove a movie from the watchlist
function toggleWatchlist(movieId) {
    if (watchlist.includes(movieId)) {
        watchlist = watchlist.filter(id => id !== movieId); // Remove from watchlist if it's already added
    } else {
        watchlist.push(movieId); // Add to watchlist if it's not already added
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Save the updated watchlist to localStorage
    renderWatchlist(); // Re-render the watchlist
}

// Function to render the watchlist in the modal
function renderWatchlist() {
    watchlistContainer.innerHTML = ''; // Clear the watchlist container
    watchlist.forEach(id => {
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json()) // Fetch movie details for each item in the watchlist
            .then(movie => {
                const movieEl = document.createElement('div'); // Create a new element for the movie in the watchlist
                movieEl.classList.add('movie');
                movieEl.innerHTML = `
                    <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'http://via.placeholder.com/500x750'}" alt="${movie.title}">
                    <div class="movie-info">
                        <h3>${movie.title}</h3>
                        <span>${movie.vote_average}</span>
                    </div>
                    <button class="delete-button" onclick="removeFromWatchlist(${id})">Remove</button>
                `;
                watchlistContainer.appendChild(movieEl); // Append to the watchlist container
            });
    });
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(movieId) {
    watchlist = watchlist.filter(id => id !== movieId); // Remove movie from the watchlist array
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update the watchlist in localStorage
    renderWatchlist(); // Re-render the watchlist
}

// Event listeners for pagination buttons
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--; // Decrease page number
        fetchMovies(); // Fetch movies for the new page
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++; // Increase page number
        fetchMovies(); // Fetch movies for the new page
    }
});

// Event listener for sorting movies
sortBySelect.addEventListener('change', (e) => {
    currentSort = e.target.value; // Set the current sort option based on user selection
    fetchMovies(); // Fetch movies with the new sorting option
});

// Event listener for the search form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const searchTerm = search.value; // Get the search term from the input
    if (searchTerm) {
        getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage}`); // Fetch movies based on the search term
    }
});

// Function to fetch movies with the current page and sorting
function fetchMovies() {
    getMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${currentSort}&page=${currentPage}`);
}

// Event listeners for closing modals
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Close the movie modal
});

closeWatchlistModal.addEventListener('click', () => {
    watchlistModal.style.display = 'none'; // Close the watchlist modal
});

// Event listener to open the watchlist modal
openWatchlistButton.addEventListener('click', () => {
    watchlistModal.style.display = 'block'; // Show the watchlist modal
});

// Initialize the app by fetching movies
fetchMovies();
