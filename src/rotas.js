const express = require('express');

const rotas = express();

const { listarContasBancarias, criarContaBancaria, atualizarContaBancaria } = require('./controllers/contasControllers');
const { validadorSenha, verificaBodyPreenchido, verificaIdConta } = require('./middlewares/sistemaBancarioMiddlewares');

rotas.use(validadorSenha);

rotas.get('/contas', listarContasBancarias);

rotas.post('/contas', verificaBodyPreenchido, criarContaBancaria);

rotas.put('/contas/:id/usuario', verificaIdConta, verificaBodyPreenchido, atualizarContaBancaria);

module.exports = rotas;