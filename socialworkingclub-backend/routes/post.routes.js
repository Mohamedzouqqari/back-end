const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Route pour obtenir tous les posts
router.get('/', postController.getAllPosts);

// Route pour créer un post avec authentification
router.post('/', authMiddleware, postController.createPost);

// Route pour mettre à jour un post avec authentification
router.put('/:postId', authMiddleware, postController.updatePost);

// Route pour supprimer un post avec authentification
router.delete('/:postId', authMiddleware, postController.deletePost);

// Route pour aimer un post avec authentification
router.post('/:postId/like', authMiddleware, postController.likePost);

module.exports = router;
