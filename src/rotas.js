const express = require('express');

const rotas = express();

const { listarContasBancarias, criarContaBancaria } = require('./controllers/contasControllers');
const { validadorSenha } = require('./middlewares/sistemaBancarioMiddlewares');

rotas.use(validadorSenha);

rotas.get('/contas', listarContasBancarias);

rotas.post('/contas', criarContaBancaria);

module.exports = rotas;