const AuthRouter = require('express').Router()

const AuthController = require('../Controllers/AuthController');

AuthRouter.post('/signup', AuthController.createAccount);
AuthRouter.post('/signin', AuthController.login);
AuthRouter.post('/refresh', AuthController.refreshToken);

module.exports = AuthRouter;