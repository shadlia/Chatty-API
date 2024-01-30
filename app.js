const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
//1 global middlewares
if (process.env.NODE_ENV.trim() == 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);

module.exports = app;
