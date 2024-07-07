const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index')

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

module.exports = app;
