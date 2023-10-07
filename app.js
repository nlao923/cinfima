const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/confirm', (req, res) => {
    const name = req.body.name;
    res.send(`Olá, ${name}! Sua presença foi confirmada.`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
