#!/usr/bin/node
/**
 * Authentication Router
 *  Endpoints
 *  @login
 *  @signup
 *  @forgetpassword
 *  @changepassword
 */

const auth = require('express').Router();

auth.post('/login', (req, res) => {
    const payload = {
        'status': 'success',
        'message': 'You are successfully logged in!'
    }
    return res.send(200).json(payload);
})

module.exports = auth;