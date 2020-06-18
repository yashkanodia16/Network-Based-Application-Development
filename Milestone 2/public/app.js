
var express = require('express');
var app = express();

app.use('/assets',express.static('assets'));

app.set('view engine','ejs');

var connectionController = require('./routes/connectionController.js');

app.use('/', connectionController);

app.listen(8084);

