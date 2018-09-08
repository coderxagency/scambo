var express = require('express');
var router = express.Router();
let moment = require('moment');
const userModelo = require('../models/usersmodels')

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
    let values = {
        name: req.body.name,
        lastname: req.body.name,
        email:  req.body.email, 
        username: req.body.username, 
        password: req.body.password, 
        created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), 
        updated_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    };
    userModelo.createUser(values).then(result => {
        if(result != true) res.redirect('/signup?fail=true');
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
