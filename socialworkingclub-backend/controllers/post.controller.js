const Post = require('../models/post.model');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name'); // Assurez-vous de peupler les champs nécessaires
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};

exports.createPost = async (req, res) => {
    const { content, image } = req.body;
    const userId = req.user._id; // Assurez-vous que c'est req.user._id
    
    try {
        const post = await Post.create({ user: userId, content, image });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};

exports.updatePost = async (req, res) => {
    const { postId } = req.params;
    const { content, image } = req.body;
    const userId = req.user._id;

    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé.' });
        }
        // Vérifiez si l'utilisateur est l'auteur du post
        if (post.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour modifier ce post.' });
        }

        post.content = content;
        post.image = image;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé.' });
        }
        // Vérifiez si l'utilisateur est l'auteur du post ou un administrateur
        if (post.user.toString() !== userId.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires pour supprimer ce post.' });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};

exports.likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé.' });
        }

        // Vérifiez si l'utilisateur a déjà aimé le post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'Vous avez déjà aimé ce post.' });
        }

        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: 'Post aimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};
