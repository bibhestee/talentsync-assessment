#!/usr/bin/node

const UserController = require('../controllers/UserController');
const user = require('express').Router();

/**
 * User CRUD Router
 *  Endpoints
 *  @getUser
 *  @getAllUser
 *  @updateUser
 *  @deleteUser
 */

user.get('/users', UserController.getAllUser);
user.get('/user/:id', UserController.getUser);
user.put('/user/:id', UserController.updateUser);
// user.delete('/user/:id', UserController.deleteUser);

module.exports = user;