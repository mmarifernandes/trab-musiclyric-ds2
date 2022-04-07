const { Router } = require('express');
const { MusicasController } = require('../controllers/musicas-controller');
const routes = Router();
const musicasController = new MusicasController();


routes.get('/cadastrar', musicasController.mostraCadastro);

routes.get('/deletar/:id', musicasController.deletar);

routes.get('/detalhar/:id', musicasController.detalhar);

routes.get('/aprova/:id', musicasController.aprova);

routes.get('/naoaprova/:id', musicasController.naoaprova);

routes.get('/favoritar/:id', musicasController.favoritar);

routes.get('/datacresc', musicasController.datacresc);

routes.get('/datadecresc', musicasController.datadecresc);

routes.get('/titulocresc', musicasController.titulocresc);

routes.get('/titulodecresc', musicasController.titulodecresc);

routes.get('/', musicasController.listar);

routes.get('/:id', musicasController.detalhar);

routes.post('/', musicasController.cadastrar)

routes.get('/alterar/:id', musicasController.mostraAlterar);

routes.post('/alterar/:id', musicasController.alterar);


module.exports = routes;