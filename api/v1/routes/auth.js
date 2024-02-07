#!/usr/bin/node

const UserController = require('../controllers/UserController');
const auth = require('express').Router();

/**
 * Authentication Router
 *  Endpoints
 *  @signin
 *  @signup
 *  @resetpassword
 *  @changepassword
 */

auth.post('/signin', UserController.signin);
auth.post('/signup', UserController.signup);
auth.post('/reset-password', UserController.resetPassword);
auth.put('/change-password/:id', UserController.changePassword);

module.exports = auth;