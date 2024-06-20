exports.checkAdminRole = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Vous n\'avez pas les autorisations nécessaires.' });
    }
    next();
};
