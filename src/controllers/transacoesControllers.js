let { contas, depositos, saques, transferencias } = require('../database/bancodedados');
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

const transferirDinheiroEntreContasBancarias = async function (req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    try {
        if (!numero_conta_origem) {
            return res.status(400).json({ mensagem: "Informe um número referente a conta de origem para que seja possível fazer a transação." });
        }

        if (!numero_conta_destino) {
            return res.status(400).json({ mensagem: "Informe um número referente a conta de destino para que seja possível fazer a transação." });
        }

        const contaBuscadaDeOrigem = await buscaContaPorId(numero_conta_origem);

        if (!contaBuscadaDeOrigem) {
            return res.status(404).json({ mensagem: "Esta conta de origem não existe! Retorne um número da conta(ID) de uma conta existente." });
        }

        const contaBuscadaDeDestino = await buscaContaPorId(numero_conta_destino);

        if (!contaBuscadaDeDestino) {
            return res.status(404).json({ mensagem: "Esta conta de destino não existe! Retorne um número da conta(ID) de uma conta existente." });
        }

        if (contaBuscadaDeOrigem.usuario.senha !== senha) {
            return res.status(401).json({ mensagem: "Senha incorreta! Informe a senha da conta de origem correta para que seja possível fazer a transação." });
        }

        if (contaBuscadaDeOrigem.saldo < parseInt(valor)) {
            return res.status(400).json({ mensagem: "Saldo insuficiente! Informe um valor válido para ser transferido." });
        }

        contaBuscadaDeOrigem.saldo -= parseInt(valor);
        contaBuscadaDeDestino.saldo += parseInt(valor);

        let data = new Date();
        data = format(data, 'yyyy-MM-dd HH:mm:ss');

        const novaTransferencia = {
            data,
            numero_conta_origem,
            numero_conta_destino,
            valor: parseInt(valor)
        }

        transferencias.push(novaTransferencia);

        const contasString = JSON.stringify(contas);
        const transferenciasString = JSON.stringify(transferencias);

        await fs.writeFile('./src/database/contas.json', contasString);
        await fs.writeFile('./src/database/transferencias.json', transferenciasString);

        console.log(transferencias);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    depositarDinheiroEmContaBancaria,
    sacarDinheiroEmContaBancaria,
    transferirDinheiroEntreContasBancarias
}