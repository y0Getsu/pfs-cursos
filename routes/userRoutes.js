const express = require('express');
apUser = express.Router();
const jwtProteger = require('../middlewares/jwtMiddleware');
//Controllers
const userController = require('../controllers/userController');

//Middlewares

//Routes


apUser.get('/listar', jwtProteger.protegerRutas, userController.listar);

apUser.post('/login', userController.login);

apUser.use(jwtProteger.protegerRutas);

apUser.post('/crear', userController.crear);

apUser.put('/update', userController.update);

apUser.delete('/borrar', userController.borrar);


apUser.put('/update-password', userController.updatePassword);

module.exports = apUser;