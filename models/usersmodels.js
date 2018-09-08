const db = require('../mysql')
const bcrypt = require('bcrypt')

function selectAllUser(){
    let sql = "SELECR * FROM users ";
    db.query(sql, {}, (error, results, fields) => {
        if(error) 
            return console.log(error);
        console.log('User select all [OK]');
        return results;
    });
}
function createUser(param) {
    return new Promise((resolve, reject) =>{
        const cryptPwd = bcrypt.hashSync(param.password, 10);
        let sql = "INSERT INTO  users SET ?";
        let values = {
            name: param.name,
            lastname: param.lastname,
            email: param.email, 
            username: param.username, 
            password: cryptPwd, 
            created_at: param.created_at, 
            updated_at: param.updated_at
        };
        db.query(sql, values, (error, results, fields) => {
            if(error) reject(error);
            console.log('User added [OK]');
            resolve(true);
        });
    });
}

module.exports = {
    selectAllUser,
    createUser
}