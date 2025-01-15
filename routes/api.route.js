var express = require('express');
var router = express.Router();

const authController = require('../controllers/api/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/api/userController');

// Endpoint login
router.post('/login', authController.signin);

// Endpoint halo dengan middleware verifyToken dan isAdmin
router.get('/halo', 
    [authMiddleware.verifyToken, authMiddleware.isAdmin], 
    userController.index
);

module.exports = router;
