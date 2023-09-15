let { contas, identificadorConta } = require('../database/bancodedados');
const { buscaCpf, buscaEmail, buscaContaPorId, buscaIndiceCpfIgual, buscaIndiceEmailIgual } = require('../services/funcoesContas');
const fs = require('fs/promises');

const listarContasBancarias = async function (req, res) {
    return res.status(200).json(contas);
}

const criarContaBancaria = async function (req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        if (await buscaCpf(cpf)) {
            return res.status(409).json({ mensagem: "CPF já cadastrado no sistema! Informe um CPF válido." });
        }

        if (await buscaEmail(email)) {
            return res.status(409).json({ mensagem: "Email já cadastrado no sistema! Informe um email válido." });
        }

        const novaConta = {
            id: identificadorConta++,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

        contas.push(novaConta);

        const contasString = JSON.stringify(contas);
        const identificadorContaString = JSON.stringify(identificadorConta);

        await fs.writeFile('./src/database/contas.json', contasString);
        await fs.writeFile('./src/database/identificadorConta.json', identificadorContaString);

        return res.status(201).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

const atualizarContaBancaria = async function (req, res) {
    const { id } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        const contaBuscada = await buscaContaPorId(id);

        if (!contaBuscada) {
            return res.status(404).json({ mensagem: "Esta conta não existe! Retorne um ID de uma conta existente." });
        }

        const indiceCpfIgual = await buscaIndiceCpfIgual(cpf);

        if (indiceCpfIgual !== -1 && contas[indiceCpfIgual].id !== parseInt(id)) {
            return res.status(409).json({ mensagem: "CPF já cadastrado no sistema! Informe um CPF válido." });
        }

        const indiceEmailIgual = await buscaIndiceEmailIgual(email);

        if (indiceEmailIgual !== -1 && contas[indiceEmailIgual].id !== parseInt(id)) {
            return res.status(409).json({ mensagem: "Email já cadastrado no sistema! Informe um email válido." });
        }

        contaBuscada.usuario.nome = nome;
        contaBuscada.usuario.cpf = cpf;
        contaBuscada.usuario.data_nascimento = data_nascimento;
        contaBuscada.usuario.telefone = telefone;
        contaBuscada.usuario.email = email;
        contaBuscada.usuario.senha = senha;

        const contasString = JSON.stringify(contas);

        await fs.writeFile('./src/database/contas.json', contasString);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

const excluirContaBancaria = async function (req, res) {
    const { id } = req.params;

    try {
        const contaBuscadaParaExcluir = await buscaContaPorId(id);

        if (!contaBuscadaParaExcluir) {
            return res.status(404).json({ mensagem: "Esta conta não existe! Retorne um ID de uma conta existente." });
        }

        if (contaBuscadaParaExcluir.saldo !== 0) {
            return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
        }

        contas = contas.filter(function (conta) {
            return conta.id !== parseInt(id);
        });

        const contasString = JSON.stringify(contas);

        await fs.writeFile('./src/database/contas.json', contasString);

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

const exibirSaldoContaBancaria = async function (req, res) {
    const { numero_conta, senha } = req.query;

    try {
        if (!numero_conta) {
            return res.status(400).json({ mensagem: "Informe um número da conta(ID) para que seja possível exibir o saldo." });
        }

        if (!senha) {
            return res.status(400).json({ mensagem: "Informe uma senha para que seja possível exibir o saldo." });
        }

        const contaBuscadaParaExibir = await buscaContaPorId(numero_conta);

        if (!contaBuscadaParaExibir) {
            return res.status(404).json({ mensagem: "Esta conta não existe! Retorne um número da conta(ID) de uma conta existente." });
        }

        if (contaBuscadaParaExibir.usuario.senha !== senha) {
            return res.status(401).json({ mensagem: "Senha incorreta! Informe a senha da conta correta para que seja possível exibir o seu saldo." });
        }

        return res.status(200).json({ saldo: contaBuscadaParaExibir.saldo });
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }

}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarContaBancaria,
    excluirContaBancaria,
    exibirSaldoContaBancaria
}