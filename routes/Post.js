const express = require('express');
const PostController = require('../controllers/PostController');
const upload = require('../utils/multer');

const router = express.Router();

// Get All Posts
router.get('/', PostController.GetPost);
//Get All Post By User
router.get('/:userId', PostController.GetPost);
//Get All Comments on a Post
router.get('/getComments/:id', PostController.GetComments);
// Create Post
router.post('/', upload.single('image'), PostController.AddPost);
//Post a comment
router.post('/addComment/:id', PostController.AddComment);
//Like a Post
router.post('/likePost/:id', PostController.likePost);

module.exports = router;
