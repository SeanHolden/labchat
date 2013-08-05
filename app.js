var express = require('express');
var app = express();

app.get('/', function(req, res){
  var body = '<h1>Hello World</h1>';
  res.setHeader('Content-Type', 'text/html');
  res.end(body);
});

app.listen(3000);