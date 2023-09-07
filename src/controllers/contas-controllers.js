const { contas } = require('../bancodedados');


const buscarContasBancarias = async function (req, res) {
    return res.status(200).json(contas);
}

module.exports = {
    buscarContasBancarias
}