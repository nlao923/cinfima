const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Escolha a porta que deseja usar

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));

// Servir arquivos estáticos (por exemplo, seu arquivo HTML)
app.use(express.static('public'));

// Rota para processar solicitações POST do formulário
app.post('/confirm', (req, res) => {
    const name = req.body.name;
    res.send(`Olá, ${name}! Sua presença foi confirmada.`);
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
