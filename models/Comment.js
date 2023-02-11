const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: String,
  commented_by: { type: mongoose.SchemaTypes.ObjectId, ref: 'Profile' },
  post: { type: mongoose.SchemaTypes.ObjectId, ref: 'Post' },
});

const Comment = mongoose.model('Comment', CommentSchema);

exports.Comment = Comment;
