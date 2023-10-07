const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));

// Servir arquivos estáticos (por exemplo, seu arquivo HTML)
app.use(express.static('public'));

// Lista para armazenar as confirmações
const confirmacoes = [];

// Rota para processar solicitações POST do formulário
app.post('/confirm', (req, res) => {
    const name = req.body.name;
    const novaConfirmacao = {
        nome: name,
        data: new Date().toLocaleString(),
    };
    confirmacoes.push(novaConfirmacao);
    res.send(`Olá, ${name}! Sua presença foi confirmada.`);
});

// Rota SSE para enviar eventos de confirmação ao cliente
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    const sendSSE = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Enviar todas as confirmações armazenadas na lista ao cliente
    confirmacoes.forEach((confirmacao) => {
        sendSSE({ confirmation: confirmacao });
    });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
