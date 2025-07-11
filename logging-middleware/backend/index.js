// index.js
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(logger); // ✅ Custom logging middleware
app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
