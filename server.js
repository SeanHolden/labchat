var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var GroupVideo = require('./lib/groupvideo');
var app = express();


// Settings
app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname+'/views');
  app.use(expressLayouts);
  app.use(express.static(__dirname + '/public'));
});

var gv = GroupVideo();

// Routes
app.get('/', function(request, response){
  response.setHeader('Content-Type', 'text/html');
  gv.getSessionIdAndToken(request, response, function(response, sessionId, token){
    response.render('index', {
      locals: {
        url: gv.urlToCopy(sessionId),
        token: token,
        sessionId: sessionId
      }
    });
    response.end();
  });
});
var port = process.env.PORT || 3000;
app.listen(port || 3000);
console.log('Listening on ' + port);
