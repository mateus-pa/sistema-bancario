const contas = require('./contas.json');
const identificadorConta = require('./identificadorConta.json');
const depositos = require('./depositos.json');
const saques = require('./saques.json');
const transferencias = require('./transferencias.json');

module.exports = {
    identificadorConta,
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [...contas],
    saques: [...saques],
    depositos: [...depositos],
    transferencias: [...transferencias]
}