@echo off
echo 🚀 Preparing Web Scraper for Coolify deployment...
echo.

echo 📦 Installing dependencies...
npm install

echo.
echo 🧪 Testing locally first...
echo.

echo 📡 Testing health endpoint...
curl -s http://localhost:3000/api/health || echo "❌ Health check failed"

echo.
echo 🔍 Testing scraping endpoint...
curl -s "http://localhost:3000/api/scrape?url=https://google.com" | findstr "html" && echo "✅ Scraping works!" || echo "❌ Scraping failed"

echo.
echo 📋 Files ready for Coolify:
echo ✅ Dockerfile
echo ✅ coolify.yml
echo ✅ server.js
echo ✅ package.json
echo ✅ .dockerignore
echo.

echo 🚀 Next steps:
echo 1. Push to GitHub/GitLab
echo 2. Connect repository in Coolify
echo 3. Deploy automatically
echo.

echo 📖 See deploy-coolify.md for detailed instructions
echo.
pause
