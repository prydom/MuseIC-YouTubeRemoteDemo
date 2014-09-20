// LOGS!!!
var log = document.getElementById('log-list');

function logEntry(entry) {
  var newEntry = document.createElement('li');
  var text = document.createTextNode(entry);
  newEntry.appendChild(text);
  log.appendChild(newEntry);

}

// Youtube API Stuff

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.loadPlaylist({'listType': 'playlist',
                            'list': 'RDFILRj44S7w0',
                            'index': '0',
                            'startSeconds': '0',
                            'suggestedQuality': 'hd720'});
}


var skip_btn = document.getElementsByName('skip-btn')[0];
skip_btn.addEventListener('click', nextVideo)


function nextVideo() {
  player.nextVideo();
  logEntry("Skipped to next video.");
}

// Push notification stuff

var evtSrc = new EventSource("/subscribe");

eveSrc.onmessage = function (e) {
  console.log(e.data);
  logEntry("Revieved an arbitrary PUSH notification: " + e.data);
};

evtSrc.addEventListener('next_video', function(e) {
    console.log(e.data);
    logEntry("Recieved a PUSH event to advance video.");
    nextVideo();
});
