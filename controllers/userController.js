const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtToken = require('../helpers/jwtHelper');

function listar(req, res) {
    User.find({}, (err, user) => {
        if (err) {
            return res.status(400).json({ 'error': error, 'message': 'No se han podido listar usuarios' });
        }
        if (user) {
            return res.status(200).json({ 'message': 'Lista de usuarios', 'usuarios': user });
        }
    });
}

function crear(req, res) {
    const usuario = req.body.user;

    bcrypt.hash(usuario.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.status(400).json({ 'error': 'no se ha podido encryptar' });
        }
        if (hash) {
            usuario.password = hash;

            new User(usuario).save().then(newUser => {

                console.log('Nuevo usuario creado', newUser);
                res.status(200).json({ newUser });

            }).catch(err => {
                console.log('Error en creacion de usuarios', err);
                res.status(404).send({ 'error': err });
            });
        }
    });
}

function update(req, res) {
    let id = req.query.id;
    const usuario = req.body.user;

    const protectedUser = {
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
    }

    User.updateOne({ _id: id }, { $set: protectedUser }, { new: true }, (error, userUpdate) => {
        if (error) return res.status(400).json({ error });
        if (user) return res.status(200).json({ 'message': 'El id no existe en la base de datos' });

        if (userUpdate) return res.status(200).json({ 'message': 'Usuario Actualizado', userUpdate });

    });
}

function borrar(req, res) {
    let id = req.query.id;

    if (id.length === 24) {
        User.deleteOne({ _id: id }, (error, deleteUser) => {
            if (error) return res.status(400).json({ error });
            if (deleteUser) return res.status(200).json({ 'message': 'Usuario borrado', deleteUser });

        });

    } else {
        return res.status(200).json({ 'message': 'Id inválido' });

    }

}

function login(req, res) {
    let usuario = req.body.user;

    User.findOne({ email: usuario.email }, (err, checkUser) => {
        if (err) return res.status(400).json({ 'error': error });

        if (checkUser) {
            bcrypt.compare(usuario.password, checkUser.password, (err, resp) => {
                if (err) return res.status(200).json({ 'error': err });

                if (resp) {
                    let token = jwtToken.encode(resp);
                    return res.status(200).json({ 'message': 'contraseña usuario logeado', 'usuario': resp, token });
                } else {
                    return res.status(400).json({ 'error': 'email o password no coinciden' });
                }

            });
        }
        else {
            return res.status(200).json({ 'error': 'no existe' });
        }
    });
}

function updatePassword(req, res) {
    let id = req.query.id;
    const password = req.body.user.password;
    if (id.length === 24) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(400).json({ 'error': 'no se ha podido encryptar' });
            }
            if (hash) {
                User.updateOne({ _id: id }, { $set: { password: hash } }, { new: true }, (error, passwordUpdate) => {
                    if (error) return res.status(400).json({ error });
                    
                    if (passwordUpdate){
                        return res.status(200).json({ 'message': 'Contraseña  Actualizada', passwordUpdate });
                    } else {
                        return res.status(200).json({ 'message': 'El id no existe en la base de datos' });

                    }

                });
            }
        });
    } else {
        return res.status(200).json({ 'message': 'Id inválido' });

    }

}


module.exports = {
    listar,
    crear,
    update,
    borrar,
    login,
    updatePassword

};