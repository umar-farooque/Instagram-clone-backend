const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function () {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nd3issj.mongodb.net/test`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => console.log('Connected to database....'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
