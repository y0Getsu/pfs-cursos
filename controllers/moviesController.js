const Movie = require('../models/moviesModel');

function list(req, res) {
    Movie.find({}).populate('user').exec((error, movies) => {
        if(error) {
            return res.status(400).json({'error': error});
        }
        if(movies) {
            return res.status(200).json({'movies': movies});
        } else {
            return res.status(400).json({'error': 'no se pueden mostrar peliculas'});
        }
    });
}

function create(req, res) {
    if(!req.body.movie) {
        return res.status(400).json({'error': 'Faltan parmetros'});
    } else {
        let body = req.body.movie;

        new Movie(body).save()
        .then((movieCreated) => {
            return res.status(200).json({'message': 'movie creada', 'movie': movieCreated});
        })
        .catch(error => {
            return res.status(400).json({'error': 'No se ha podido crear la película', error});
        });
    }
}

function update(req, res) {
    if(!req.query.id) {
        return res.status(400).json({'error': 'Faltan parámetros movie'});

    } else {
        let id = req.query.id;
        let body = req.body.movie;

        Movie.updateOne({_id: id}, {$set: body}, (error, movieUpdate) => {
            if(error) {
                return res.status(400).json({'error': 'error en actualizar pelicula'});
            }
            if(movieUpdate) {
                return res.status(400).json({'message': 'pelicula actualizada', 'movie': movieUpdate});
            }
        });
    }
}

function borrar(req, res) {
    if(!req.query.id) {
        return res.status(400).json({'error': 'Faltan parámetros borrar movie'});

    } else {
        let id = req.query.id;

        Movie.deleteOne({_id: id}, (error, movieDelete) => {
            if(error) {
                return res.status(400).json({'error': 'error en borrar movie'});
            }
            if(movieDelete) {
                return res.status(400).json({'message': 'pelicula borrada', 'movie': movieDelete});
            }
        });
    }    
}

module.exports = {
    list,
    create,
    update,
    borrar
}