let { contas, depositos, saques } = require('../database/bancodedados');
const { buscaContaPorId } = require('../services/funcoesContas');

const fs = require('fs/promises');
const { format } = require('date-fns');

const depositarDinheiroEmContaBancaria = async function (req, res) {
    const { numero_conta, valor } = req.body;

    try {
        const contaBuscadaParaDeposito = await buscaContaPorId(numero_conta);

        if (!contaBuscadaParaDeposito) {
            return res.status(404).json({ mensagem: "Esta conta não existe! Retorne um número da conta(ID) de uma conta existente." });
        }

        contaBuscadaParaDeposito.saldo += parseInt(valor);


        let data = new Date();
        data = format(data, 'yyyy-MM-dd HH:mm:ss');

        const novoDeposito = {
            data,
            numero_conta,
            valor: parseInt(valor)
        }

        depositos.push(novoDeposito);

        const contasString = JSON.stringify(contas);
        const depositosString = JSON.stringify(depositos);

        await fs.writeFile('./src/database/contas.json', contasString);
        await fs.writeFile('./src/database/depositos.json', depositosString);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

const sacarDinheiroEmContaBancaria = async function (req, res) {
    const { valor, numero_conta, senha } = req.body;

    try {
        const contaBuscadaParaSaque = await buscaContaPorId(numero_conta);

        if (!contaBuscadaParaSaque) {
            return res.status(404).json({ mensagem: "Esta conta não existe! Retorne um número da conta(ID) de uma conta existente." });
        }

        if (contaBuscadaParaSaque.usuario.senha !== senha) {
            return res.status(401).json({ mensagem: "Senha incorreta! Informe a senha da conta correta para que seja possível fazer a transação." });
        }

        if (contaBuscadaParaSaque.saldo < parseInt(valor)) {
            return res.status(400).json({ mensagem: "Saldo insuficiente! Informe um valor válido de saque." });
        }

        contaBuscadaParaSaque.saldo -= parseInt(valor);
        let data = new Date();
        data = format(data, 'yyyy-MM-dd HH:mm:ss');

        const novoSaque = {
            data,
            numero_conta,
            valor: parseInt(valor)
        }

        saques.push(novoSaque);

        const contasString = JSON.stringify(contas);
        const saquesString = JSON.stringify(saques);

        await fs.writeFile('./src/database/contas.json', contasString);
        await fs.writeFile('./src/database/saques.json', saquesString);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    depositarDinheiroEmContaBancaria,
    sacarDinheiroEmContaBancaria
}