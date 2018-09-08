/**
 * Enable empty value on .env variables
 */
require('dotenv-safe').config({
    allowEmptyValues: true
})

let mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected on database [OK]');
});

module.exports = connection