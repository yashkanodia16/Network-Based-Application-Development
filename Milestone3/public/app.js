
var express = require('express');
var app = express();
var session = require('express-session');
var connectionController = require('./routes/connectionController');

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use(session({
    secret : 'login-session',
    resave : false,
    saveUninitialized : true
  })) 

app.use('/', connectionController);

app.listen(8084);
