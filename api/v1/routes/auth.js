#!/usr/bin/node

const UserController = require('../controllers/UserController');
const auth = require('express').Router();

/**
 * Authentication Router
 *  Endpoints
 *  @login
 *  @signup
 *  @resetpassword
 *  @changepassword
 */

auth.post('/login', UserController.login);
auth.post('/signup', UserController.signup);
auth.post('/reset-password', UserController.resetPassword);
auth.put('/change-password/:id', UserController.changePassword);

module.exports = auth;