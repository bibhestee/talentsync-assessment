#!/usr/bin/node 

/**
 * Main API module
 */

const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const blog = require('./routes/blog');
const user = require('./routes/user');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const requestLogger = require('./middlewares/requestLogger');

const app = express()

/* ------ Middlewares --- */
app.use(express.json())
app.use(cors())

app.use(requestLogger);

app.get('/', (req, res) => {
    return res.status(200).json('Welcome');
})

/* ------ Routes ----- */
app.use('/api/v1/auth', auth);
app.use('/api/v1/blog', blog);
app.use('/api/v1', user);

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})