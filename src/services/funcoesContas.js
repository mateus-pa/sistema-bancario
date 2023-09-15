const { contas } = require('../database/bancodedados');

const buscaCpf = async function (cpf) {
    const cpfEncontrado = contas.find(function (conta) {
        return conta.usuario.cpf === cpf;
    });

    return cpfEncontrado;
}

const buscaEmail = async function (email) {
    const emailEncontrado = contas.find(function (conta) {
        return conta.usuario.email === email;
    });

    return emailEncontrado;
}

const buscaContaPorId = async function (id) {
    const contaEncontrada = contas.find(function (conta) {
        return conta.id === parseInt(id);
    });

    return contaEncontrada;
}

const buscaIndiceCpfIgual = async function (cpf) {
    const posicaoContaCpfIgual = contas.findIndex(function (conta) {
        return conta.usuario.cpf === cpf;
    });

    return posicaoContaCpfIgual;
}

const buscaIndiceEmailIgual = async function (email) {
    const posicaoContaEmailIgual = contas.findIndex(function (conta) {
        return conta.usuario.email === email;
    });

    return posicaoContaEmailIgual;
}

const filtraNumeroContaIgual = async function (identificadorDaConta, arrayTransacoes) {
    const numeroContaIgual = arrayTransacoes.filter(function (objTransacao) {
        return identificadorDaConta === objTransacao.numero_conta;
    });

    return numeroContaIgual;
}

module.exports = {
    buscaCpf,
    buscaEmail,
    buscaContaPorId,
    buscaIndiceCpfIgual,
    buscaIndiceEmailIgual,
    filtraNumeroContaIgual
}