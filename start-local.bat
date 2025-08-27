@echo off
echo 🚀 Starting Web Scraper API locally...
echo.

echo 📦 Installing dependencies...
npm install

echo.
echo 🏃 Starting server...
echo.
echo ✅ Scraper API is running!
echo.
echo 📡 Health Check: http://localhost:3000/api/health
echo 🔍 Scrape URL: http://localhost:3000/api/scrape?url=YOUR_URL
echo.
echo 🛑 Press Ctrl+C to stop
echo.

node server.js
