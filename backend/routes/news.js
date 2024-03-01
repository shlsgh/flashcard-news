// backend/routes/news.js
import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import axios from 'axios';

const router = Router();
const API_KEY = process.env.NEWS_API_KEY; // Ensure this is set in your .env file
const BASE_URL = 'https://newsapi.org/v2';

/**
 * GET /api/news
 * 
 * Optional query param: ?location=someSearchTerm
 * - If no location is provided, it fetches top headlines for the US.
 * - If a location is provided, it searches for articles about that query.
 */
router.get('/', async (req, res) => {

  try {
    const { location } = req.query;
    let url;

    if (location) {
      url = `${BASE_URL}/everything?q=${encodeURIComponent(location)}&apiKey=${API_KEY}`;
    } else {
      url = `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
    }

    const response = await axios.get(url);
    console.log(String(response));
    // Map NewsAPI's articles to the format required by the frontend
    const articles = response.data.articles.map((article, index) => ({
      id: index,
      title: article.title,
      snippet: article.description,
      location: location || '',
      content: article.content || article.description,
      imageURL: article.urlToImage || '',
      publishedAt: article.publishedAt,
      url: article.url || ''
    }));

    res.json(articles);
  } catch (error) {
    console.error('Error fetching news:', error?.response?.data ?? error.message);
    res.status(500).json({ message: 'Error fetching news' });
  }
});

export default router;
