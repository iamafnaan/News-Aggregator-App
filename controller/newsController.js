
import { getTopHeadlines as _getTopHeadlines, searchArticles } from '../services/newsService';


class NewsController {
  static async getTopHeadlines(req, res) {
    try {
      const { country } = req.query;
      
      // If no country is specified, detect the user's country
      const selectedCountry = country 

      // Validate and normalize country code
      
      
      // Currently supporting only 'in' and default to 'us'
      const validCountry = selectedCountry === 'in' ? 'in' : 'us';

      const newsData = await _getTopHeadlines(validCountry);
      res.json(newsData);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error fetching top headlines', 
        message: error.message 
      });
    }
  }

  static async searchNews(req, res) {
    try {
      const { q: query, language, category } = req.query;
      const searchResults = await searchArticles(query, { language, category });
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error searching articles', 
        message: error.message 
      });
    }
  }
}

export default NewsController;