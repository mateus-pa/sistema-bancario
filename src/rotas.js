const express = require('express');

const rotas = express();

const { listarContasBancarias, criarContaBancaria, atualizarContaBancaria, excluirContaBancaria } = require('./controllers/contasControllers');
const { depositarDinheiroEmContaBancaria } = require('./controllers/transacoesControllers');
const { validadorSenha, verificaBodyPreenchidoContas, verificaIdConta } = require('./middlewares/sistemaBancarioMiddlewares');

// contas
rotas.get('/contas', validadorSenha, listarContasBancarias);

rotas.post('/contas', verificaBodyPreenchidoContas, criarContaBancaria);

rotas.put('/contas/:id/usuario', verificaIdConta, verificaBodyPreenchidoContas, atualizarContaBancaria);

rotas.delete('/contas/:id', verificaIdConta, excluirContaBancaria);

// transacoes
rotas.post('/transacoes/depositar', depositarDinheiroEmContaBancaria);

module.exports = rotas;