const { chromium } = require('playwright-core');

async function testScraping() {
  console.log('🚀 Starting local scraping test...');
  
  const testUrl = 'https://conext.click';
  let browser = null;
  
  try {
    console.log('📱 Launching browser...');
    
    // Launch browser with local configuration
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    console.log('✅ Browser launched successfully!');
    
    const page = await browser.newPage();
    console.log('📄 New page created');
    
    // Set user agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    console.log('🔧 User agent set');
    
    // Set viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    console.log('📐 Viewport set');
    
    // Navigate to the URL
    console.log(`🌐 Navigating to: ${testUrl}`);
    await page.goto(testUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    console.log('✅ Page loaded successfully!');
    
    // Wait for dynamic content
    await page.waitForTimeout(2000);
    console.log('⏳ Waited for dynamic content');
    
    // Get the page content
    const content = await page.content();
    console.log(`📝 Content length: ${content.length} characters`);
    
    // Check if we got meaningful content
    if (content.length > 1000) {
      console.log('🎉 SUCCESS: Scraping worked locally!');
      console.log('📊 Content preview:', content.substring(0, 200) + '...');
    } else {
      console.log('⚠️  WARNING: Content seems too short');
    }
    
  } catch (error) {
    console.error('❌ ERROR during scraping:', error.message);
    console.error('🔍 Full error:', error);
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
}

// Run the test
testScraping().then(() => {
  console.log('🏁 Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Test failed:', error);
  process.exit(1);
});
