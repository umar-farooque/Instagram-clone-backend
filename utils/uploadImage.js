const cloudinary = require('./cloudinary');

exports.uploadSingleImage = async (image, upload_preset = '', options = {}) =>
  await cloudinary.uploader.upload(image, {
    upload_preset,
    ...options,
  });

exports.deleteImage = async (image_key) => {
  await cloudinary.uploader.destroy(image_key);
};
