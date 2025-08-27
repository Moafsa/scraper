const express = require('express');
const router = express.Router();

const healthRouter = require('./health');
const scrapeRouter = require('./scrape');

router.use(healthRouter);
router.use(scrapeRouter);

module.exports = router;
