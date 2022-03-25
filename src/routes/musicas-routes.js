const { Router } = require('express');

// IMPORTAÇÃO DO musicas-CONTROLLER
// CONST NOME-RECURSO = REQUIRE(ARQUIVO);
const { MusicasController } = require('../controllers/musicas-controller');

// const Router = require('express').Router

// const express = require('express')
// const Router = express.Router

// O NOSSO ROUTER COMEÇA COM /musicas
const routes = Router();

const musicasController = new MusicasController();


routes.get('/cadastrar', musicasController.mostraCadastro);

routes.get('/deletar/:id', musicasController.deletar);

routes.get('/', musicasController.listar);

routes.get('/:id', musicasController.detalhar);

routes.post('/', musicasController.cadastrar)


module.exports = routes;