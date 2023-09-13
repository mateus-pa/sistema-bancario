const validadorSenha = function (req, res, next) {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: "A senha do banco precisa ser informada para ter acesso." });
    }

    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida! Informe uma senha correta." });
    }

    next();
}

const verificaBodyPreenchidoContas = function (req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

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

    next();
}

const verificaIdConta = function (req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ mensagem: "Informe um id para que seja possível atualizar a conta." });
    }

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "O id da conta precisa ser composto apenas por números." });
    }

    next();
}

module.exports = {
    validadorSenha,
    verificaBodyPreenchidoContas,
    verificaIdConta
}