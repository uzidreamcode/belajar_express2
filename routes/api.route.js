var express = require('express');
var router = express.Router();

const authController = require('../controllers/api/authController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/login', authController.signin);

module.exports = router;