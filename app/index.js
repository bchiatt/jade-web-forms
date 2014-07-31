'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var symb = req.body.sign;
  var x = req.body.x * 1;
  var y = req.body.y * 1;
  var result;

  switch(symb){
    case '+':
      result = x + y;
      break;
    case '-':
      result = x - y;
      break;
    case '*':
      result = x * y;
      break;
    case '/':
      result = x / y;
      break;
  }

  res.render('calc', {x:x, y:y, result:result, symb:symb});
});

app.get('/boxes', function(req, res){
  res.render('boxes1');
});

app.post('/boxes', function(req, res){
  var number = parseInt(req.body.number);

  console.log(number);

  var l = req.body.height.split('-');
  var w = req.body.width.split('-');
  var colors = req.body.colors.split(', ');
  var boxes = [];

  l = l.map(function(x) {return x * 1;});
  w = w.map(function(x) {return x * 1;});

  for(var i = 0; i < number; i++){
    var color = colors[Math.floor(Math.random()*colors.length)];
    var height = Math.floor(Math.random() * (l[1]-l[0]) + l[0]);
    var width = Math.floor(Math.random() * (w[1]-w[0]) + w[0]);
    boxes.push({color:color, height:height, width:width});
  }
  console.log(boxes);
  res.render('boxes2', {boxes:boxes});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is at your service on port', port);
});
