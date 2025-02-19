
// Get the movie listings element
const movieListingsElement = document.getElementById('movie-listings');

// Function to get movie listings from the server
async function getMovieListings() {
    try {
        const response = await fetch('/api/movie-listings');
        const movieListings = await response.json();
        return movieListings;
    } catch (error) {
        console.error(error);
    }
}

// Function to render movie listings
async function renderMovieListings() {
    const movieListings = await getMovieListings();
    const movieListingsHTML = movieListings.map((movie) => {
        return `
            <li>
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <p>Price: $${movie.price}</p>
                <button>Buy Now</button>
            </li>
        `;
    }).join('');
    movieListingsElement.innerHTML = movieListingsHTML;
}

// Call the renderMovieListings function
renderMovieListings();

// Get the post movie form element
const postMovieFormElement = document.getElementById('post-movie-form');

// Function to handle post movie form submission
async function handlePostMovieFormSubmission(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    try {
        const response = await fetch('/api/post-movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                price,
                category
            })
        });
        const movie = await response.json();
        renderMovieListings();
    } catch (error) {
        console.error(error);
    }
}

// Add an event listener to the post movie form element
postMovieFormElement.addEventListener('submit', handlePostMovieFormSubmission);

// Get the search bar form element
const searchBarFormElement = document.getElementById('search-bar-form');

// Function to handle search bar form submission
async function handleSearchBarFormSubmission(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('search-input').value;
    try {
        const response = await fetch(`/api/search-movies?q=${searchQuery}`);
        const searchResults = await response.json();
        const searchResultsHTML = searchResults.map((movie) => {
            return `
                <li>
                    <img src="${movie.image}" alt="${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>
                    <p>Price: $${movie.price}</p>
                    <button>Buy Now</button>
                </li>
            `;
        }).join('');
        movieListingsElement.innerHTML = searchResultsHTML;
    } catch (error) {
        console.error(error);
    }
}

// Add an event listener to the search bar form element
searchBarFormElement.addEventListener('submit', handleSearchBarFormSubmission);


