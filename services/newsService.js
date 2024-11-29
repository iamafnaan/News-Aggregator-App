const axios = require('axios');
const { BASE_URL, SOURCES } = require('../config/newsApi');

class NewsService {
  static async getTopHeadlines(country) {
    try {
      const apiKey = process.env.NEWS_API_KEY;

      // Determine parameters for the request
      const params = country === 'in'
        ? { sources: SOURCES.INDIA, apiKey }
        : { country: 'us', apiKey };

      // Make the API call
      const response = await axios.get(`${BASE_URL}/top-headlines`, { params });

      // Return the full API response
      return {
        status: response.data.status,
        totalResults: response.data.totalResults,
        articles: response.data.articles,
      };
    } catch (error) {
      console.error('Error fetching top headlines:', error.response ? error.response.data : error.message);
      throw new Error(`Failed to fetch top headlines for ${country}`);
    }
  }

  static async searchNews(query, country) {
    try {
      const apiKey = process.env.NEWS_API_KEY;

      // Determine parameters for the request
      const params = country === 'in'
        ? { q: query, sources: SOURCES.INDIA, apiKey }
        : { q: query, country: 'us', apiKey };

      // Make the API call
      const response = await axios.get(`${BASE_URL}/everything`, { params });

      // Return the full API response
      return {
        status: response.data.status,
        totalResults: response.data.totalResults,
        articles: response.data.articles,
      };
    } catch (error) {
      console.error('Error searching news:', error.response ? error.response.data : error.message);
      throw new Error(`Failed to search news for ${query} in ${country}`);
    }
  }
}

module.exports = NewsService;
