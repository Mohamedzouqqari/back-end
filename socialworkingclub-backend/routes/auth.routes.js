const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

// Route d'inscription
router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    // Vérifier les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email déjà utilisé.' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Mot de passe haché:", hashedPassword);

        // Créer un nouvel utilisateur
        user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        let user = await User.findOne({ email });
        if (!user) {
            console.log("Utilisateur non trouvé");
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }

        // Afficher le mot de passe stocké pour le débogage
        console.log("Mot de passe haché stocké:", user.password);

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Résultat de la comparaison des mots de passe:", isMatch);

        if (!isMatch) {
            console.log("Mot de passe incorrect");
            return res.status(401).json({ error: 'Identifiants invalides.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
});

module.exports = router;
