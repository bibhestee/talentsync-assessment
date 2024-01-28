#!/usr/bin/node
/**
 * Blog Post Router
 *  Endpoints
 *  @new
 *  @getAll
 *  @get
 *  @update
 *  @delete
 */

const blog = require('express').Router();

blog.post('/new', (req, res) => {
    const payload = {
        'status': 'success',
        'message': 'Blog post created successfully!'
    }
    return res.send(200).json(payload);
})

module.exports = blog;