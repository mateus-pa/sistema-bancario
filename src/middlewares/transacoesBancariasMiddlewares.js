const verificaSenhaBodyTransacoes = function (req, res, next) {
    const { senha } = req.body;

    if (!senha) {
        return res.status(401).json({ mensagem: "Informe a senha da conta para que seja possível fazer a transação." });
    }

    next();
}

const verificaBodyValoresTransacoes = function (req, res, next) {
    const { valor } = req.body;

    if (!valor) {
        return res.status(400).json({ mensagem: "Informe um valor para que seja possível fazer a transação." });
    }

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: "O valor precisa ser composto apenas por valores numéricos(em centavos) para efetuar a transação." });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor precisa ser maior do que zero(centavos) para efetuar a transação." });
    }

    next();
}

const verificaBodyNumeroContaTransacoes = function (req, res, next) {
    const { numero_conta } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Informe o número da conta(ID) para que seja possível fazer a transação." });
    }

    if (isNaN(numero_conta)) {
        return res.status(400).json({ mensagem: "O numero da conta(ID) precisa ser composto apenas por valores numéricos para efetuar a transação." });
    }

    next();
}

module.exports = {
    verificaSenhaBodyTransacoes,
    verificaBodyValoresTransacoes,
    verificaBodyNumeroContaTransacoes
}