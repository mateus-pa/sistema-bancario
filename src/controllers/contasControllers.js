const { contas } = require('../bancodedados');
let { identificadorConta } = require('../bancodedados');
const { buscaCpf, buscaEmail } = require('../services/funcoesContas');

const listarContasBancarias = async function (req, res) {
    return res.status(200).json(contas);
}

const criarContaBancaria = async function (req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {
        // valida o body
        if (!nome) {
            return res.status(400).json({ mensagem: "O nome é um campo obrigatório para proceder com a criação da conta." });
        }

        if (!cpf) {
            return res.status(400).json({ mensagem: 'O CPF é um campo obrigatório para proceder com a criação da conta.' });
        }

        if (!data_nascimento) {
            return res.status(400).json({ mensagem: 'A data de nascimento é um campo obrigatório para proceder com a criação da conta.' });
        }

        if (!telefone) {
            return res.status(400).json({ mensagem: 'O telefone é um campo obrigatório para proceder com a criação da conta.' });
        }

        if (!email) {
            return res.status(400).json({ mensagem: 'O email é um campo obrigatório para proceder com a criação da conta.' });
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'A senha é um campo obrigatório para proceder com a criação da conta.' });
        }

        // verifica CPF
        if (await buscaCpf(cpf)) {
            return res.status(409).json({ mensagem: "CPF já cadastrado no sistema! Informe um CPF válido." });
        }

        // verifica email
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

module.exports = {
    listarContasBancarias,
    criarContaBancaria
}