#!/usr/bin/node

/**
 * Request logger handler
 * 
 */

function requestLogger(req, res, next) {
    console.log('Method: %s', req.method);
    console.log('Path:  %s', req.path);
    console.log('Body:  %s', req.body);
    console.log('---');
    next();
}

module.exports = requestLogger;