var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var GroupVideo = require('./lib/groupvideo');
var app = express();


// Settings
app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname+'/views');
  app.use(expressLayouts);
});

// Routes
app.get('/', function(request, response){
  response.setHeader('Content-Type', 'text/html');
  var gv = GroupVideo();
  gv.getSessionIdAndToken(request, response, gv.sessionTokenCallback);
});

app.listen(3000);
