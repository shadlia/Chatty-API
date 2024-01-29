const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
//1 global middlewares
if (process.env.NODE_ENV.trim() == 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

module.exports = app;
