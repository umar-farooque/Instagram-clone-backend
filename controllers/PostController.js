const { default: mongoose } = require('mongoose');
const { Comment } = require('../models/Comment');
const { Post } = require('../models/Post');
const { Profile } = require('../models/Profile');
const { uploadSingleImage } = require('../utils/uploadImage');

exports.AddPost = async (req, res) => {
  try {
    const post = new Post({
      profile: req.body?._id,
      caption: req.body?.caption,
    });
    const profile = await Profile.findById(req.body?._id);
    profile.post.push(post._id);

    const image = await uploadSingleImage(req.file.path);
    post.postImage = image.secure_url;
    post.cloudinaryPostImage = image.public_id;
    await post.save();
    await profile.save();

    return res.send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.GetUserPosts = async (req, res) => {
  try {
    const allPost = await Post.find({ profile: req.params.userId })
      .sort({ createdAt: 'descending' })
      .lean();
    return res.send(allPost);
  } catch (error) {
    res.staus(400).send(error);
  }
};

exports.GetPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: 'descending' })
      .populate('profile');

    return res.send(posts);
  } catch (error) {
    res.send(error);
  }
};

exports.GetComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate(
      'commented_by'
    );

    return res.send(comments);
  } catch (error) {
    res.send(error);
  }
};

exports.AddComment = async (req, res) => {
  const { comment, commented_by } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post Not found');
    const newComment = new Comment({
      comment,
      commented_by,
      post: req.params.id,
    });
    post.comments.push(newComment._id);
    await newComment.save();
    await post.save();

    res.send(newComment);
  } catch (error) {
    req.status(400).send(error);
  }
};
exports.likePost = async (req, res) => {
  console.log(req.params, req.body);

  try {
    let newPost;
    const post = await Post.findById(req.params.id);
    console.log(
      post.likes,
      post.likes.includes(mongoose.Types.ObjectId(req.body.userId))
    );

    if (post.likes.includes(mongoose.Types.ObjectId(req.body.userId))) {
      newPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { likes: req.body.userId },
        },
        { new: true }
      );
    } else {
      newPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: { likes: req.body.userId },
        },
        { new: true }
      );
    }

    return res.send(newPost);
  } catch (error) {
    req.status(400).send(error);
  }
};
