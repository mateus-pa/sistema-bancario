const express = require('express');

const rotas = express();

const { listarContasBancarias } = require('./controllers/contas-controllers');

rotas.get('/contas', listarContasBancarias);

module.exports = rotas;