const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('./auth.controller');

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);

module.exports = AuthRouter;