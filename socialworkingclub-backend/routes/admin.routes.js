const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/credentials', adminController.getAdminCredentials);

module.exports = router;
