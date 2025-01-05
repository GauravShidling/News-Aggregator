
const API_KEY = '1E_YUcM1g2OQGDgbnksbExdHKDPavoKCgL0BzsJdZFQ';
const BASE_URL = 'https://api.newsdatahub.com/v1/news';

document.getElementById('searchButton').addEventListener('click', fetchNews);

async function fetchNews() {
    const query = document.getElementById('searchQuery').value.trim();
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (!query) {
        newsContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    try {
        // Fetch news articles with proper headers
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY, // Correct header for API key
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log response for debugging

        if (data.data && data.data.length) {
            for (const article of data.data) {
                newsContainer.innerHTML += createNewsCard(article);
            }
        } else {
            newsContainer.innerHTML = '<p>No news articles found. Try another query!</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = `<p>Error fetching news: ${error.message}. Please try again later.</p>`;
    }
}

function createNewsCard(article) {
    return `
        <div class="news-item">
            <img src="${article.media_url || 'default-image.jpg'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.article_link}" target="_blank">Read More</a>
        </div>
    `;
}