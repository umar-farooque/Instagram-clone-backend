const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

//Register User
router.post('/signup', UserController.RegisterUser);

//Login User
router.post('/login', UserController.LoginUser);

module.exports = router;
