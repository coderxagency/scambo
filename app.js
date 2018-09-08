require('dotenv-safe').config({
  allowEmptyValues: true
})
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

require('./authentication/auth')(passport);

var options = {
  host: 'localhost',
  port: 3306,
  user: 'eduardo',
  password: 'password',
  database: 'mydb'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  key: 'myapp',
  secret: '12345678',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
