const puppeteer = require('puppeteer');
const puppeteerConfig = require('../config/puppeteerConfig');

const scrapeUrl = async (url) => {
  let browser = null;
  try {
    console.log(`🚀 Starting scrape for: ${url}`);
    
    browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteerConfig.executablePath,
      args: puppeteerConfig.launchArgs
    });

    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log(`🌐 Navigating to: ${url}`);
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Correct way to wait for a fixed time in newer Puppeteer versions
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = await page.content();
    
    console.log(`✅ Successfully scraped ${url} (${content.length} characters)`);
    
    return content;
  } catch (error) {
    console.error(`❌ Scraping error for ${url}:`, error);
    // Re-throw the error to be handled by the route handler
    throw new Error(`Failed to scrape the URL: ${error.message}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
        console.log('🔒 Browser closed');
      } catch (closeError) {
        console.error('❌ Error closing browser:', closeError);
      }
    }
  }
};

module.exports = {
  scrapeUrl
};
