var express = require('express');
var router = express.Router();



const authController = require('../controllers/api/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/api/userController');
const absensiController = require('../controllers/api/absensiController');

// Endpoint login
router.post('/login', authController.signin);

router.get('/getkaryawan', 
    [authMiddleware.verifyToken, authMiddleware.isAdmin], 
    userController.pagination
);
router.post('/add_karyawan', 
    [authMiddleware.verifyToken, authMiddleware.isAdmin], 
    userController.add_karyawan
);

router.post('/add_bulk', 
    [authMiddleware.verifyToken, authMiddleware.isAdmin], 
    userController.bulkStore
);


router.post('/absensi', 
    [authMiddleware.verifyToken], 
    absensiController.absensi
);

router.get('/profile', 
    [authMiddleware.verifyToken], 
    userController.profile
);






module.exports = router;
