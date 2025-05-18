// js/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configurarRotas = require('./routes'); // Importa as rotas
const path = require('path');

const porta = 3003;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configura as rotas
configurarRotas(app);

app.use(express.static(path.join(__dirname, '..')));

// **Define a rota "/" para carregar o index.html**
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/historico', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'historico.html'));  // Localize o arquivo corretamente
});




// Inicia o servidor
app.listen(porta, () => console.log(`✅ Servidor rodando na porta ${porta}`));
