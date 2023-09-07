const { contas } = require('../bancodedados');


const listarContasBancarias = async function (req, res) {
    return res.status(200).json(contas);
}

module.exports = {
    listarContasBancarias
}