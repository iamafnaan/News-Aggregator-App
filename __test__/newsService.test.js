
const axios = require('axios');
const NewsService = require('../services/newsService');

jest.mock('axios');

describe('NewsService', () => {

  beforeAll(() => {
    process.env.NEWS_API_KEY = 'test-api-key';
  });

  describe('getTopHeadlines', () => {
    it('should fetch top headlines for India', async () => {
      
      const mockResponse = {
        data: {
          status: 'ok',
          totalResults: 2,
          articles: [
            {
              source: { id: 'google-news-in', name: 'Google News (India)' },
              title: 'Test India Headline',
              description: 'Test description'
            }
          ]
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await NewsService.getTopHeadlines('in');

      expect(result).toEqual({
        status: 'ok',
        totalResults: 2,
        articles: mockResponse.data.articles
      });

      expect(axios.get).toHaveBeenCalledWith('https://newsapi.org/v2/top-headlines', {
        params: {
          sources: 'google-news-in',
          apiKey: 'test-api-key'
        }
      });
    });

    // 

    it('should throw an error for failed API call', async () => {
      // Mock API error
      axios.get.mockRejectedValue(new Error('API Error'));

      await expect(NewsService.getTopHeadlines('us')).rejects.toThrow('Failed to fetch top headlines for us');
    });
  });

  describe('searchNews', () => {
    it('should search news for India', async () => {
      // Mock successful search response
      const mockResponse = {
        data: {
          status: 'ok',
          totalResults: 2,
          articles: [
            {
              source: { id: 'google-news-in', name: 'Google News (India)' },
              title: 'Test India News',
              description: 'Test search description'
            }
          ]
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await NewsService.searchNews('technology', 'in');

      expect(result).toEqual({
        status: 'ok',
        totalResults: 2,
        articles: mockResponse.data.articles
      });

      // Verify axios was called with correct parameters
      expect(axios.get).toHaveBeenCalledWith('https://newsapi.org/v2/everything', {
        params: {
          q: 'technology',
          sources: 'google-news-in',
          apiKey: 'test-api-key'
        }
      });
    });

    it('should throw an error for failed search', async () => {
      // Mock API error
      axios.get.mockRejectedValue(new Error('Search Error'));

      await expect(NewsService.searchNews('technology', 'us')).rejects.toThrow('Failed to search news for technology in us');
    });
  });
});