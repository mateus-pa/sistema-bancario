const express = require('express');

const rotas = express();

const { buscarContasBancarias } = require('./controllers/contas-controllers');

rotas.get('/contas', buscarContasBancarias);

module.exports = rotas;