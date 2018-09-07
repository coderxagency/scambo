var express = require('express');
var router = express.Router();
let moment = require('moment');

let db = require('../mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  if (req.query.fail)
    res.render('signup', {title: 'Signup', message: 'Falha no cadastro do usuário!'});
  else
    res.render('signup', {title: 'Signup', message: null });
});

router.post('/signup', function(req, res, next) {
  let created_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let updated_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  db.createUser(name, lastname, email, username, password, created_at, updated_at, (err, result) => {
    if (err) res.redirect('/signup?fail=true');
    res.redirect('/');
  });
});

router.get('/profile', function(req, res) {
  if(req.query.fail)
    res.redirect('/login');
  else
    res.render('profile', { title: 'Profile' });
  
});

router.get('/forget', function(req, res) {
  res.render('forget', { title: 'Forget Password'});
});

module.exports = router;
