require('dotenv').config({ path: __dirname + '/../credenciais.env' });


const mysql = require('mysql2');


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect(err => {
    if (err) console.error('Erro na conexão com o banco de dados: ' + err);
    else console.log('Conectado ao banco de dados');
})

module.exports = db;