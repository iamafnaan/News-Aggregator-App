
const express = require('express');
const NewsService = require('../services/newsService');

const router = express.Router();

// Route for top headlines by country
router.get('/top-headlines', async (req, res) => {
  try {
    const { country = 'us' } = req.query;
    
    // Validate country input (only 'in' or 'us')
    if (!['in', 'us'].includes(country.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid country. Use "in" for India or "us" for United States' 
      });
    }

    const newsData = await NewsService.getTopHeadlines(country.toLowerCase());
    res.json(newsData);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error fetching top headlines', 
      message: error.message 
    });
  }
});

// Route for searching news by query and country
router.get('/query', async (req, res) => {
  try {
    const { q: query, country = 'us' } = req.query;

    // Validate query and country input
    if (!query) {
      return res.status(400).json({ 
        error: 'Search query is required' 
      });
    }

    if (!['in', 'us'].includes(country.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid country. Use "in" for India or "us" for United States' 
      });
    }

    const searchResults = await NewsService.searchNews(query, country.toLowerCase());
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error searching news', 
      message: error.message 
    });
  }
});

module.exports = router;