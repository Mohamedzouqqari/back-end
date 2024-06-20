const User = require('../models/user.model');

exports.getAdminCredentials = async (req, res) => {
    try {
        const admin = await User.findOne({ isAdmin: true });
        if (!admin) {
            return res.status(404).json({ message: 'Administrateur non trouvé.' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur.' });
    }
};
