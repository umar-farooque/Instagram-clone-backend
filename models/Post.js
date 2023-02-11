const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Types.ObjectId, ref: 'Profile' },
    postImage: {
      type: String,
      required: true,
    },
    cloudinaryPostImage: { type: String, required: true },
    caption: { type: String, default: 'null' },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

exports.Post = Post;
