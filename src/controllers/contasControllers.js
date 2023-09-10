const { contas } = require('../bancodedados');
let { identificadorConta } = require('../bancodedados');
const { buscaCpf, buscaEmail, buscaContaPorId, buscaIndiceCpfIgual, buscaIndiceEmailIgual } = require('../services/funcoesContas');

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

        return res.status(204).send();
    } catch (erro) {
        return res.status(500).json({ mensagem: erro.message });
    }
}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarContaBancaria
}