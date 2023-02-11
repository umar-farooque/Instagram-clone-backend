const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Profile } = require('./Profile');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username },
    process.env.jwt_private_key,
    { expiresIn: '30d' }
  );
};

UserSchema.methods.comparePassword = async function (dbPassword, userPassword) {
  return await bcrypt.compare(dbPassword, userPassword);
};

// UserSchema.post('save', async function (doc) {
//   await Profile.create({ user: doc._id });
// });

const User = mongoose.model('User', UserSchema);

exports.User = User;
