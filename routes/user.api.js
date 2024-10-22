const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
//1. 회원가입 endpoint

router.post("/", userController.createUser);

router.post("/login", userController.loginWithEmail);
router.get('/me',authController.authenticate ,userController.getUser);

module.exports = router;

