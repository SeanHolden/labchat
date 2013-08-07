var OpenTok = require('opentok');
var opentok = new OpenTok.OpenTokSDK(process.env.TOKBOX_API_KEY, process.env.TOKBOX_SECRET);

function GroupVideo() {

  function urlToCopy(sessionId){
    var url;
    if(process.env.NODE_ENV == 'production'){
      url = process.env.ROOT_URL;
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

  return {
    getSessionIdAndToken : getSessionIdAndToken,
    urlToCopy : urlToCopy
  };
}

module.exports = GroupVideo;
