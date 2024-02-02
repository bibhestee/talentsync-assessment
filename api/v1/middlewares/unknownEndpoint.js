#!/usr/bin/node

/**
 * Unknown endpoint handler
 * 
 */

function unknownEndpoint(req, res) {
    const payload = {
        'status': 'error',
        'message': 'unknown endpoint'
    };

    return res.status(400).json(payload);
}

module.exports = unknownEndpoint;