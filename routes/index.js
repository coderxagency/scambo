let passport = require('passport')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  if (req.query.fail){
    res.render('login', { title: 'Login', message: 'Usuário e/ou senha inválido(s).'})
  } else {
    res.render('login', { title: 'Login', message: null });
  }
});

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/chat', 
    failureRedirect: '/login?fail=true'
  })
)

router.get('/chat', authenticationMiddleware (), function(req, res) {
  res.render('chat', { 
    title: 'ChatApp', 
    username: req.user.username
  });
});


function authenticationMiddleware () {
  return function(req, res, next) {
    if (req.isAuthenticated()){
      return next()
    }
    res.redirect('/login?fail=false')
  }
}

module.exports = router;
