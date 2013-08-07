var OpenTok = require('opentok');
var opentok = new OpenTok.OpenTokSDK(process.env.TOKBOX_API_KEY, process.env.TOKBOX_SECRET);

function GroupVideo() {

  function urlToCopy(sessionId){
    var url;
    if(process.env.NODE_ENV == 'production'){
      url ='http://thelabjabber.herokuapp.com';
    }else{
      url = 'http://localhost:3000';
    }
    return url + '/?room_id=' + sessionId;
  }

  function getSessionIdAndToken(request, response, callback){
    if (request.query.room_id){
      var sessionId = request.query.room_id;
      var token = opentok.generateToken({session_id:sessionId, role:'publisher'});
      callback(response, sessionId, token);
    } else {
      opentok.createSession('', function(result){
        var sessionId = result;
        var token = opentok.generateToken({session_id:sessionId, role:'publisher'});
        callback(response, sessionId, token);
      });
    };
  }

  function sessionTokenCallback(response, sessionId, token) {
    // response.end('<p>Session Id: '+sessionId+'</p><p>Token: '+token+'</p><p>'+urlToCopy(sessionId)+'</p>');
    response.render('index', {
        locals: {
          url: urlToCopy(sessionId),
        }
      });
    response.end();
  }

  return {
    getSessionIdAndToken : getSessionIdAndToken,
    sessionTokenCallback : sessionTokenCallback
  };
}

module.exports = GroupVideo;
