const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/salvar', (req, res) => {
  const { horario, aeronave, resultado } = req.body;
  const sql = 'INSERT INTO analiseHums (horario, aeronave, resultado) VALUES (?, ?, ?)';

  db.query(sql, [horario, aeronave, resultado], (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      res.status(500).send('Erro no servidor');
    } else {
      res.status(200).send('Dados salvos com sucesso!');
    }
  });
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));