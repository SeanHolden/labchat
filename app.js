var express = require('express');
var app = express();
var key = process.env.TOKBOX_API_KEY;    // Replace with your API key  
var secret = process.env.TOKBOX_SECRET;  // Replace with your API secret  
var opentok = new OpenTok.OpenTokSDK(key, secret);

app.get('/', function(req, res){
  var body = '<h1>Hello World</h1>';
  res.setHeader('Content-Type', 'text/html');
  res.end(body);
});

app.listen(3000);