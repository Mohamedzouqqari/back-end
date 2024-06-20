const User = require('../models/user.model'); // Assurez-vous que le chemin vers votre modèle d'utilisateur est correct
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà existant.' });
    }

    // Hachez le mot de passe
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });
        }

        // Créez un nouvel utilisateur avec le mot de passe haché
        const newUser = new User({
            email: email,
            password: hash
        });

        try {
            // Enregistrez l'utilisateur dans la base de données
            await newUser.save();
            res.status(201).json({ message: 'Utilisateur créé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
        }
    });
};
