var express = require('express');
var router = express.Router();



const authController = require('../controllers/api/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/api/userController');

// Endpoint login
router.post('/login', authController.signin);

router.get('/getkaryawan', 
    [authMiddleware.verifyToken, authMiddleware.isAdmin], 
    userController.pagination
);

router.get('/profile', 
    [authMiddleware.verifyToken], 
    userController.profile
);






module.exports = router;
