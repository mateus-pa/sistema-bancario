const { contas } = require('../bancodedados');

const buscaCpf = async function (cpf) {
    const resultado = contas.find(function (conta) {
        return conta.usuario.cpf === cpf;
    });
    return resultado;
}

const buscaEmail = async function (email) {
    const resultado = contas.find(function (conta) {
        return conta.usuario.email === email;
    });
    return resultado;
}

module.exports = {
    buscaCpf,
    buscaEmail
}