const express = require('express');
const appMovie = express.Router();

//Controllers
const moviesController = require('../controllers/moviesController');

appMovie.get('/listar', moviesController.list);

appMovie.post('/create', moviesController.create);

appMovie.put('/update', moviesController.update);

appMovie.delete('/borrar', moviesController.borrar);

module.exports = appMovie;
