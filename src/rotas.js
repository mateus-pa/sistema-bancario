const express = require('express');

const rotas = express();

// controllers
const { listarContasBancarias, criarContaBancaria, atualizarContaBancaria, excluirContaBancaria, exibirSaldoContaBancaria, exibirExtratoContaBancaria } = require('./controllers/contasControllers');
const { depositarDinheiroEmContaBancaria, sacarDinheiroEmContaBancaria, transferirDinheiroEntreContasBancarias } = require('./controllers/transacoesControllers');

// middlewares
const { validadorSenha, verificaBodyPreenchidoContas, verificaIdConta, verificaQueryParamsConta } = require('./middlewares/contasMiddlewares');
const { verificaSenhaBodyTransacoes, verificaBodyNumeroContaTransacoes, verificaBodyValoresTransacoes } = require('./middlewares/transacoesBancariasMiddlewares');

// contas rotas
rotas.get('/contas', validadorSenha, listarContasBancarias);
rotas.get('/contas/saldo', verificaQueryParamsConta, exibirSaldoContaBancaria);
rotas.get('/contas/extrato', verificaQueryParamsConta, exibirExtratoContaBancaria);
rotas.post('/contas', verificaBodyPreenchidoContas, criarContaBancaria);
rotas.put('/contas/:id/usuario', verificaIdConta, verificaBodyPreenchidoContas, atualizarContaBancaria);
rotas.delete('/contas/:id', verificaIdConta, excluirContaBancaria);

// transacoes rotas
rotas.post('/transacoes/depositar', verificaBodyNumeroContaTransacoes, verificaBodyValoresTransacoes, depositarDinheiroEmContaBancaria);
rotas.post('/transacoes/sacar', verificaSenhaBodyTransacoes, verificaBodyNumeroContaTransacoes, verificaBodyValoresTransacoes, sacarDinheiroEmContaBancaria);
rotas.post('/transacoes/transferir', verificaSenhaBodyTransacoes, verificaBodyValoresTransacoes, transferirDinheiroEntreContasBancarias);

module.exports = rotas;