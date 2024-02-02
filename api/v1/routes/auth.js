#!/usr/bin/node

const UserController = require('../controllers/UserController');
const auth = require('express').Router();

/**
 * Authentication Router
 *  Endpoints
 *  @login
 *  @signup
 *  @forgetpassword
 *  @changepassword
 */

auth.post('/login', UserController.login);
auth.post('/signup', UserController.signup);
auth.put('/change-password/:id', UserController.changePassword);

module.exports = auth;