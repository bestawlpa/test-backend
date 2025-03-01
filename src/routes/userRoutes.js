const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/user', userController.createUser);
router.get('/users', userController.getAllUsers);
router.post('/login', userController.userLogin);

module.exports = router;