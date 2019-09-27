const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const movieSchema = Schema({  
    titulo: {
        type: String,
        required: [true, 'Es necesario el nombre']
    },

    descripcion: {
        type: String,
        required: [true, 'Es necesario el password']
    },

    imagen: String ,
    user: {
        type: Schema.ObjectId, ref: 'user'
    }
});

module.exports = mongoose.model('movie', movieSchema);