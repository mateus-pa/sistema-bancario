const express = require('express');

const rotas = express();

const { listarContasBancarias, criarContaBancaria, atualizarContaBancaria, excluirContaBancaria } = require('./controllers/contasControllers');
const { depositarDinheiroEmContaBancaria, sacarDinheiroEmContaBancaria } = require('./controllers/transacoesControllers');
const { validadorSenha, verificaBodyPreenchidoContas, verificaIdConta } = require('./middlewares/contasMiddlewares');
const { verificaSenhaBodyTransacoes, verificaBodyPreenchidoTransacoes } = require('./middlewares/transacoesBancariasMiddlewares');

// contas
rotas.get('/contas', validadorSenha, listarContasBancarias);
rotas.post('/contas', verificaBodyPreenchidoContas, criarContaBancaria);
rotas.put('/contas/:id/usuario', verificaIdConta, verificaBodyPreenchidoContas, atualizarContaBancaria);
rotas.delete('/contas/:id', verificaIdConta, excluirContaBancaria);

// transacoes
rotas.post('/transacoes/depositar', verificaBodyPreenchidoTransacoes, depositarDinheiroEmContaBancaria);
rotas.post('/transacoes/sacar', verificaSenhaBodyTransacoes, verificaBodyPreenchidoTransacoes, sacarDinheiroEmContaBancaria);

module.exports = rotas;