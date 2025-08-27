module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Web Scraper API is running',
    timestamp: new Date().toISOString()
  });
};
