const { Profile } = require('../models/Profile');
const { uploadSingleImage, deleteImage } = require('../utils/uploadImage');

exports.GetProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('user', '-password')
      .populate('post');

    if (!profile) return res.status(404).send('User Not Found');
    return res.send(profile);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.UpdateProfile = async (req, res) => {
  try {
    let image = {};
    let member = await Profile.findById(req.params.id);
    if (req.file) {
      if (member.profileImage_cloudinary_key) {
        await deleteImage(member.profileImage_cloudinary_key);
      }
      let result = await uploadSingleImage(req.file.path);
      image.profileImage = result.secure_url;
      image.profileImage_cloudinary_key = result.public_id;
    }
    let profile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          ...image,
        },
      },
      { new: true }
    );
    console.log(profile);
    if (!profile) return res.status(404).send('User Not Found');
    return res.status(200).send(profile);
  } catch (error) {
    console.log(error);
  }
};
