/**
 * Enable empty value on .env variables
 */
require('dotenv-safe').config({
    allowEmptyValues: true
})
const bcrypt = require('bcrypt')
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
    console.log('Connected on database');
});

function createUser(name, lastname, email, username, password, created_at, updated_at, callback) {
    const cryptPwd = bcrypt.hashSync(password, 10);
    //let sql = "INSERT INTO users(name, lastname, email, username, password, created_at, updated_at) VALUES ?";
    let sql = "INSERT INTO  users SET ?";
    let values = {
        name: name,
        lastname: lastname,
        email: email, 
        username: username, 
        password: cryptPwd, 
        created_at: created_at, 
        updated_at: updated_at
    };
    connection.query(sql, values, (error, results, fields) => {
        if(error) 
            return console.log(error);
        
        console.log('User added');
        connection.end();
    });
}

module.exports = {
    connection,
    createUser
};