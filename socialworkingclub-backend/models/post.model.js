const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Remplacez 'User' par le nom de votre modèle d'utilisateur
  content: { type: String, required: true },
  image: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Tableau d'identifiants d'utilisateurs ayant aimé la publication
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Tableau d'identifiants de commentaires
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
