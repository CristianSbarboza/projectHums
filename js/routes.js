// routes.js

const express = require('express');
const db = require('./db');

// Função para salvar os dados no banco de dados
const salvarDados = async (req, res) => {
  try {
    const { horario, aeronave, resultado } = req.body;

    // Verifica se todos os dados foram enviados
    if (!aeronave || !horario || !resultado) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
    }

    const sql = 'INSERT INTO analiseHums (aeronave, horario, resultado) VALUES (?, ?, ?)';
    
    // Executa a query como Promise
    const [result] = await db.promise().query(sql, [aeronave, horario, resultado]);

    res.status(200).json({
      mensagem: 'Dados salvos com sucesso!',
      idInserido: result.insertId
    });


  } catch (err) {
    console.error('Erro ao inserir no banco:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};



// Rota para buscar registros agrupados por data
const getDados = async (req, res) => {
  try {
    // Aqui você pode consultar o banco de dados ou retornar dados mockados.
    const sql = `
      SELECT data_operacao, JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', id,
          'horario', horario,
          'aeronave', aeronave,
          'resultado', resultado
        )
      ) AS registros
      FROM analiseHums
      GROUP BY data_operacao
      ORDER BY data_operacao DESC;
    `;

    const [result] = await db.promise().query(sql);
    res.status(200).json(result); // Retorna os dados no formato JSON

  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};


// Criação das rotas
const configurarRotas = (app) => {
  app.post('/salvar', salvarDados);
  app.get('/historico/dados', getDados);
};


module.exports = configurarRotas;
