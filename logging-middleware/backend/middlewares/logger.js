// middlewares/logger.js
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../request.log');

const logger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

  // Write to file
  fs.appendFile(logFile, log, (err) => {
    if (err) console.error('❌ Failed to log request:', err);
  });

  next();
};

module.exports = logger;
