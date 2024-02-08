#!/usr/bin/node
const jwt = require('jsonwebtoken');

/**
 * Authorization
 * 
 */

function Authorization(req, res, next) {
    // Get the request header
    const authorization = req.headers['authorization'];
    // Extract the auth token
    const token = authorization.split(' ')[1];
    // Validate the auth token
    try {
        const isValid = jwt.verify(token, 'SOMETHINGHERE');
        console.log(isValid)
        if (isValid) {
            req.auth = isValid;
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'error',
            message: `internal server error: ${err}`
        });
    }
}

module.exports = Authorization;