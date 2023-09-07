const express = require('express');

const app = express();

const rotas = require('./rotas');

const { validadorSenha } = require('./middlewares/sistema-bancario-middlewares');

app.use(express.json());

app.use(validadorSenha);

app.use(rotas);

app.listen(8000);