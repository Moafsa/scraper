# Web Scraper API

A serverless web scraping API built with Node.js, Express, and Playwright, optimized for Vercel deployment.

## Features

- 🚀 **Serverless**: Optimized for Vercel deployment
- 🌐 **Universal**: Can scrape any website with JavaScript rendering
- ⚡ **Fast**: Uses Playwright with Chromium for optimal performance
- 🔒 **Secure**: Input validation and error handling
- 📱 **CORS Ready**: Cross-origin requests supported
- 🏥 **Health Check**: Built-in health monitoring endpoint

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Vercel CLI installed (`npm install -g vercel`)
- Git repository (optional but recommended)

### Installation

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd web-scraper-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Test locally (optional)**
   ```bash
   npm run dev
   ```

### Deploy to Vercel

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy the project**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `web-scraper-api` (or your preferred name)
   - Directory: `./` (current directory)

4. **Your API will be available at:**
   ```
   https://your-project-name.vercel.app/api/scrape
   ```

## API Usage

### Scrape a Website

**Endpoint:** `GET /api/scrape`

**Parameters:**
- `url` (required): The URL to scrape

**Example:**
```bash
curl "https://your-project-name.vercel.app/api/scrape?url=https://example.com"
```

### Health Check

**Endpoint:** `GET /api/health`

**Example:**
```bash
curl "https://your-project-name.vercel.app/api/health"
```

## Using with n8n

1. **Add HTTP Request node to your workflow**

2. **Configure the node:**
   - **Method:** GET
   - **URL:** `https://your-project-name.vercel.app/api/scrape`
   - **Send Query Parameters:** ✅ Enable
   - **Parameters:**
     - Name: `url`
     - Value: `{{ $json.url }}` (or your target URL)

3. **Connect to XML node** (if scraping RSS/XML content)
   - Input: `{{ $json }}`

### Example n8n Workflow

```
HTTP Request → XML → Your Processing Logic
```

**HTTP Request Configuration:**
```json
{
  "method": "GET",
  "url": "https://your-project-name.vercel.app/api/scrape",
  "queryParameters": {
    "url": "https://www.cepea.esalq.usp.br/rss.php"
  }
}
```

## Local Development

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Test the API:**
   ```bash
   curl "http://localhost:3000/api/scrape?url=https://example.com"
   ```

### Environment Variables

No environment variables are required for basic functionality. The API uses default configurations optimized for Vercel.

## Project Structure

```
web-scraper-api/
├── api/
│   └── scrape.js          # Main serverless function
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
├── README.md             # This file
└── arquitetura.md        # Original architecture document
```

## Technical Details

### Technologies Used

- **Express.js**: Web framework for API endpoints
- **Playwright**: Browser automation for JavaScript rendering
- **@sparticuz/chromium**: Chromium binary optimized for serverless
- **Vercel**: Serverless deployment platform

### Performance Optimizations

- **Browser Reuse**: Efficient browser lifecycle management
- **Timeout Handling**: 30-second navigation timeout
- **Resource Cleanup**: Automatic browser cleanup
- **CORS Support**: Cross-origin request handling
- **Error Handling**: Comprehensive error responses

### Security Features

- **Input Validation**: URL format validation
- **Error Sanitization**: Safe error message handling
- **Resource Management**: Proper cleanup of browser instances

## Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Increase timeout in `vercel.json` if needed
   - Check if the target website is slow to load

2. **Memory Issues**
   - The API automatically closes browser instances
   - Monitor Vercel function logs for memory usage

3. **CORS Errors**
   - The API includes CORS headers
   - Ensure your client is making proper requests

### Debugging

1. **Check Vercel Logs:**
   ```bash
   vercel logs
   ```

2. **Test Health Endpoint:**
   ```bash
   curl "https://your-project-name.vercel.app/api/health"
   ```

3. **Local Testing:**
   ```bash
   npm run dev
   curl "http://localhost:3000/api/scrape?url=https://example.com"
   ```

## Limitations

- **Vercel Free Tier**: 10-second timeout limit (configurable up to 60s)
- **Memory**: Limited to 1024MB per function
- **Concurrent Requests**: Vercel free tier limits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Vercel documentation
3. Open an issue in the repository

---

**Happy Scraping! 🕷️**
