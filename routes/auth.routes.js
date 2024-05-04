const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validator = require('../middleware/validator');
const middleValidator = require('../middleware/validation');

router.post('/register', [validator.register, middleValidator], authController.register);
router.post('/login', [validator.login, middleValidator], authController.login);

module.exports = router;
