var apiKey;
var sessionId;
var token;
var session;

$(function(){
  init();
});

function init(){
  apiKey = "36185002";
  sessionId = $('#session-token').data('sessionid');
  token = $('#session-token').data('token');
  console.log('session='+sessionId);
  console.log('token='+token);
  // Enable console logs for debugging
  TB.setLogLevel(TB.DEBUG);

  // Initialize session, set up event listeners, and connect
  session = TB.initSession(sessionId);
  session.addEventListener('sessionConnected', sessionConnectedHandler);
  session.addEventListener('streamCreated', streamCreatedHandler);
  session.connect(apiKey, token);
}

function sessionConnectedHandler(event) {
  // var publisher = TB.initPublisher(apiKey, 'myPublisherDiv', {mirror:true, name:"Sean H"});
  var publisher = TB.initPublisher(apiKey, 'myPublisherDiv');
  session.publish(publisher);

  // Subscribe to streams that were in the session when we connected
  subscribeToStreams(event.streams);
}

function streamCreatedHandler(event) {
  // Subscribe to any new streams that are created
  subscribeToStreams(event.streams);
}

function subscribeToStreams(streams) {

  // subToWebrtcStreams(streams);
  subToFlashStreams(streams);

}

// function subToWebrtcStreams(streams){
//   for (var i = 0; i < streams.length; i++) {
//     // Make sure we don't subscribe to ourself
//     if (streams[i].connection.connectionId == session.connection.connectionId) {
//       return;
//     }

//     var number_of_streams = $(".streams").length;
//     $("#stream-containers").append("<div id=\"stream-container-"+(number_of_streams+1)+"\" class=\"streams\" style=\"margin-right:4px;\"></div>");

//     // Subscribe to the stream
//     session.subscribe(streams[i], 'stream-container-'+(number_of_streams+1));
//   }
// }

// Below function is for flash instead of webRTC.

function subToFlashStreams(streams){
  for (var i = 0; i < streams.length; i++) {
    // Make sure we don't subscribe to ourself
    if (streams[i].connection.connectionId == session.connection.connectionId) {
      return;
    }

    $("#stream-containers").append("<div id=\"stream-container-"+i+"\" class=\"streams\"></div>");

    // Subscribe to the stream
    session.subscribe(streams[i], 'stream-container-'+i);
  }
}
