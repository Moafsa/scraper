const puppeteer = require('puppeteer');
const fs = require('fs');

async function testScraping() {
  console.log('🧪 Testing local scraping...');
  
  // Try to find Chromium executable
  const possiblePaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable'
  ];
  
  let executablePath = null;
  for (const path of possiblePaths) {
    if (path && fs.existsSync(path)) {
      executablePath = path;
      console.log(`✅ Found Chromium at: ${path}`);
      break;
    }
  }
  
  if (!executablePath) {
    console.log('❌ No Chromium executable found');
    return;
  }
  
  let browser = null;
  try {
    console.log('🚀 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    console.log('✅ Browser launched successfully!');
    
    const page = await browser.newPage();
    await page.goto('https://google.com', { waitUntil: 'domcontentloaded' });
    
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    console.log('🎉 SUCCESS: Scraping works locally!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Browser closed');
    }
  }
}

testScraping();
