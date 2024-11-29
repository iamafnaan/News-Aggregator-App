
const request = require('supertest');
const express = require('express');
const newsRoutes = require('../routes/newsRoutes');
const NewsService = require('../services/newsService');

jest.mock('../services/newsService');

describe('News Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/news', newsRoutes);
  });

  describe('GET /api/news/top-headlines', () => {
    it('should return top headlines for US by default', async () => {
      const mockHeadlines = {
        status: 'ok',
        totalResults: 2,
        articles: [{ title: 'Test Headline' }]
      };

      NewsService.getTopHeadlines.mockResolvedValue(mockHeadlines);

      const response = await request(app).get('/api/news/top-headlines');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockHeadlines);
      expect(NewsService.getTopHeadlines).toHaveBeenCalledWith('us');
    });

    it('should return top headlines for India', async () => {
      const mockHeadlines = {
        status: 'ok',
        totalResults: 2,
        articles: [{ title: 'India Test Headline' }]
      };

      NewsService.getTopHeadlines.mockResolvedValue(mockHeadlines);

      const response = await request(app).get('/api/news/top-headlines?country=in');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockHeadlines);
      expect(NewsService.getTopHeadlines).toHaveBeenCalledWith('in');
    });

    it('should return 400 for invalid country', async () => {
      const response = await request(app).get('/api/news/top-headlines?country=uk');

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/news/query', () => {
    it('should return search results for US', async () => {
      const mockSearchResults = {
        status: 'ok',
        totalResults: 2,
        articles: [{ title: 'Test Search Result' }]
      };

      NewsService.searchNews.mockResolvedValue(mockSearchResults);

      const response = await request(app).get('/api/news/query?q=technology');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockSearchResults);
      expect(NewsService.searchNews).toHaveBeenCalledWith('technology', 'us');
    });

    it('should return search results for India', async () => {
      const mockSearchResults = {
        status: 'ok',
        totalResults: 2,
        articles: [{ title: 'India Test Search Result' }]
      };

      NewsService.searchNews.mockResolvedValue(mockSearchResults);

      const response = await request(app).get('/api/news/query?q=technology&country=in');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockSearchResults);
      expect(NewsService.searchNews).toHaveBeenCalledWith('technology', 'in');
    });

    it('should return 400 if query is missing', async () => {
      const response = await request(app).get('/api/news/query');

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid country', async () => {
      const response = await request(app).get('/api/news/query?q=technology&country=uk');

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});