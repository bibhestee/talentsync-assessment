#!/usr/bin/node

/**
 * Request logger handler
 * 
 */

function requestLogger(req, res, next) {
    const { url, method, body } = req;
    if (method === 'POST') {
        console.log(`INCOMING: ${method} -- ${url} - ${body}`);
    } else {
        console.log(`INCOMING: ${method} -- ${url}`);
    }
    next();
}

module.exports = requestLogger;