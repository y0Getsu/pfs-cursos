const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Roles = {
    values:['Admin', 'User'],
    message: '{VALUE} role no permitido'
}


const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Es necesario el nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el password']
    },
    password: {
        type: String,
        required: [true, 'Es necesario el password']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'Role es necesario'],
        enum: Roles
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('user', userSchema);