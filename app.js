require('dotenv-safe').config({
  allowEmptyValues: true
})
var cookieSession = require('cookie-session')
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
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
};

var sessionStore = new MySQLStore(options);

app.use(session({
  key: 'myapp',
  secret: '12345678',
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));
// init Cookies:
app.use(cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['12345678']
  })
);
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
