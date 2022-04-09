const { Router } = require('express');
const UsersController = require('../controllers/users-controllers');

const routes = Router();

const usersController = new UsersController();

routes.get('/cadastrouser', usersController.mostraCadastro);
 
routes.post('/cadastrouser', usersController.cadastrar);

routes.get('/login', usersController.mostraLogin);

routes.post('/login', usersController.login);

module.exports = routes;