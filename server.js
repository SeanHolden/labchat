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
  standardSetup(request, response, 'flash');
});

app.get('/webrtc', function(request, response){
  standardSetup(request, response, 'webrtc');
});

function standardSetup(request, response, type){
  response.setHeader('Content-Type', 'text/html');
  gv.getSessionIdAndToken(request, response, function(response, sessionId, token){
    response.render('index_'+type, {
      layout: 'layout_'+type,
      locals: {
        url: gv.urlToCopy(sessionId, type),
        token: token,
        sessionId: sessionId
      }
    });
    response.end();
  });
}

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on ' + port);
