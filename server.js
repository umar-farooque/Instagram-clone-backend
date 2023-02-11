const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Adding middlewares
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled...');
}
//Initializing App
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server is running on port -> ${port}`));
