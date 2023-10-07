const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Módulo para manipular arquivos
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rota para processar solicitações POST do formulário
app.post('/confirm', (req, res) => {
    const name = req.body.name;
    const email = req.body.email; // Modifiquei para 'email' aqui

    // Crie um objeto de confirmação com nome e email
    const novaConfirmacao = {
        nome: name,
        email: email, // Modifiquei para 'email' aqui
        data: new Date().toLocaleString(),
    };

    // Lê as confirmações existentes no arquivo JSON
    let confirmacoes = [];
    try {
        const data = fs.readFileSync('confirmations.json', 'utf8');
        confirmacoes = JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
    }

    // Adiciona a nova confirmação à lista
    confirmacoes.push(novaConfirmacao);

    // Escreve as confirmações atualizadas no arquivo JSON
    fs.writeFileSync('confirmations.json', JSON.stringify(confirmacoes, null, 2));

    res.send(`Olá, ${name}! Sua presença foi confirmada.`);

    console.log(`${name} (${email}) confirmou a presença.`); // Modifiquei para 'email' aqui
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
