const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
let db = require('../mysql')

module.exports = function(passport) {
    
    function findUser(username, callback){
        let sql = `SELECT * FROM users WHERE username='${username}'`
        db.query(sql, (err, res, fields) => {
            callback(err, res[0]);
        });
        db.end();
    }

    function findUserById(id, callback) {
        db.query(`SELECT id FROM users WHERE ID=${id}`, (err, res, fields) => {
            callback(err, res[0]);
        });
        db.end();y
    }

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        findUserById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new localStrategy({
            usernameField: 'username',
            passwordField: 'password', 
        },
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {return done(err)}
                //usuário inexistente
                if(!user) { return done(null, false)}

                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) { return done(err) }
                    if (!isValid) { return done(null, false) }
                    return done(null, user)
                })
            });
        }
    ))
}