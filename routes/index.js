const Post = require('./Post');
const Profile = require('./Profile');
const User = require('./User');

module.exports = function (app) {
  app.use('/api/post', Post);
  app.use('/api/profile', Profile);
  app.use('/api/user', User);
};
