@echo off
echo 🚀 Starting Web Scraper API with Docker...
echo.

echo 📦 Building Docker image...
docker-compose build

echo.
echo 🏃 Starting container...
docker-compose up -d

echo.
echo ✅ Scraper API is running!
echo.
echo 📡 Health Check: http://localhost:3000/api/health
echo 🔍 Scrape URL: http://localhost:3000/api/scrape?url=YOUR_URL
echo.
echo 📊 To view logs: docker-compose logs -f
echo 🛑 To stop: docker-compose down
echo.
pause
