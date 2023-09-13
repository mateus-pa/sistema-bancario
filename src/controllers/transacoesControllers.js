let { contas, depositos } = require('../database/bancodedados');
const { buscaContaPorId } = require('../services/funcoesContas');

const fs = require('fs/promises');
const { format } = require('date-fns');

const depositarDinheiroEmContaBancaria = async function (req, res) {
    const { numero_conta, valor } = req.body;

    try {
        if (!numero_conta) {
            return res.status(400).json({ mensagem: "Informe o número da conta(ID) para que seja possível fazer o depósito." });
        }

        if (isNaN(numero_conta)) {
            return res.status(400).json({ mensagem: "O numero da conta(ID) precisa ser composto apenas por valores numéricos." });
        }

        if (!valor) {
            return res.status(400).json({ mensagem: "Informe um valor para que a operação de depósito possa ser efetuada." });
        }

        if (isNaN(valor)) {
            return res.status(400).json({ mensagem: "O valor do depósito precisa ser composto apenas por valores numéricos(em centavos)." });
        }

        if (valor <= 0) {
            return res.status(400).json({ mensagem: "O valor do depósito precisa ser maior do que zero(centavos)." });
        }

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

module.exports = {
    depositarDinheiroEmContaBancaria
}