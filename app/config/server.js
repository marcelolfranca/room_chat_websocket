var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

// middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //Sem esta linha, req.body vem vazio
// app.disable('view cache'); //sem esta linha, ele demora para perceber que as modificações foram feitas numa view, gerando erros
app.use(expressValidator());

consign()
    .include('./app/routes')
    .then('./app/models')
    .then('./app/controllers')
    .into(app);

module.exports = app;