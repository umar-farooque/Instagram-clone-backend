const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 100,
      default: null,
    },
    profileImage: { type: String, default: null },
    profileImage_cloudinary_key: { type: String, default: null },
    post: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post',
      },
    ],
    followers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Profile',
      },
    ],
    following: [{ type: mongoose.Schema.ObjectId, ref: 'Profile' }],
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', ProfileSchema);

exports.Profile = Profile;
