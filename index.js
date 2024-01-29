const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

//1- dataabase
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(db)
  .then((conn) => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Failed to connect to database' + error.message);
  });
//2- Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
