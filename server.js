const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

// Add process error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
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

// Main scraping endpoint
app.get('/api/scrape', async (req, res) => {
  const { url } = req.query;

  // Validate URL parameter
  if (!url) {
    return res.status(400).json({
      error: 'Missing required parameter: url',
      message: 'Please provide a URL to scrape using ?url=YOUR_URL'
    });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid URL format',
      message: 'Please provide a valid URL'
    });
  }

  let browser = null;
  
  try {
    console.log(`🚀 Starting scrape for: ${url}`);
    
    // Launch browser with Docker-optimized settings
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || 
                          '/usr/bin/chromium' || 
                          '/usr/bin/chromium-browser';
    
    browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to the URL
    console.log(`🌐 Navigating to: ${url}`);
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for dynamic content
    await page.waitForTimeout(2000);
    
    // Get the page content
    const content = await page.content();
    
    console.log(`✅ Successfully scraped ${url} (${content.length} characters)`);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    // Return the HTML content
    res.status(200).send(content);
    
  } catch (error) {
    console.error('❌ Scraping error:', error);
    
    // Don't crash the server on scraping errors
    res.status(500).json({
      error: 'Failed to scrape the URL',
      message: error.message,
      url: url,
      timestamp: new Date().toISOString()
    });
    
  } finally {
    // Always close the browser
    if (browser) {
      try {
        await browser.close();
        console.log('🔒 Browser closed');
      } catch (closeError) {
        console.error('❌ Error closing browser:', closeError);
      }
    }
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Scraper API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Scrape endpoint: http://localhost:${PORT}/api/scrape?url=YOUR_URL`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});
