const express = require('express');
const router = express.Router();
const { scrapeUrl } = require('../services/scraperService');

/**
 * @swagger
 * /api/scrape:
 *   get:
 *     summary: Scrape a URL
 *     description: Scrapes the content of a given URL
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: The URL to scrape
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully scraped URL
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid or missing URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to scrape URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 message:
 *                   type: string
 */
router.get('/scrape', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter: url',
      message: 'Please provide a URL to scrape using ?url=YOUR_URL'
    });
  }

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid URL format',
      message: 'Please provide a valid URL'
    });
  }

  try {
    const content = await scrapeUrl(url);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to scrape the URL',
      message: error.message,
      url: url,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
