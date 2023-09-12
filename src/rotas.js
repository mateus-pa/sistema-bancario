const express = require('express');

const rotas = express();

const { listarContasBancarias, criarContaBancaria, atualizarContaBancaria, excluirContaBancaria } = require('./controllers/contasControllers');
const { validadorSenha, verificaBodyPreenchido, verificaIdConta } = require('./middlewares/sistemaBancarioMiddlewares');

rotas.get('/contas', validadorSenha, listarContasBancarias);

rotas.post('/contas', verificaBodyPreenchido, criarContaBancaria);

rotas.put('/contas/:id/usuario', verificaIdConta, verificaBodyPreenchido, atualizarContaBancaria);

rotas.delete('/contas/:id', verificaIdConta, excluirContaBancaria);

module.exports = rotas;