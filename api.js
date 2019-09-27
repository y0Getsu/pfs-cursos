const express = require('express');
api = express();
const userRoutes = require('./routes/userRoutes');
const moviesRoutes = require('./routes/movieRoutes');


api.use('/users', userRoutes);
api.use('/movies',moviesRoutes);

module.exports = api;

