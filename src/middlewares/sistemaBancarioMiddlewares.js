const validadorSenha = function (req, res, next) {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "A senha do banco precisa ser informada para ter acesso." });
    }

    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida! Informe uma senha correta." });
    }

    next();
}

module.exports = {
    validadorSenha
}