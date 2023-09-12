const contas = require('./contas.json');
const identificadorConta = require('./identificadorConta.json');

module.exports = {
    identificadorConta,
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [...contas],
    saques: [],
    depositos: [],
    transferencias: []
}