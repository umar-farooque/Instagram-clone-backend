const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const router = express.Router();
const upload = require('../utils/multer');

//Get Profile Details
router.get('/:id', ProfileController.GetProfile);

//Update Profile
router.put(
  '/update/:id',
  upload.single('image'),
  ProfileController.UpdateProfile
);

module.exports = router;
