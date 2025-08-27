const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns the health status of the API
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Scraper API is running
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                    type: number
 *                 memory:
 *                    type: object
 *                 version:
 *                    type: string
 *       500:
 *          description: API is not running
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: ERROR
 *                  message:
 *                    type: string
 *                    example: Health check failed
 *                  error:
 *                    type: string
 */
router.get('/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'OK',
      message: 'Scraper API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message
    });
  }
});

module.exports = router;
