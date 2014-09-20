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
var playing = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.cuePlaylist({'listType': 'playlist',
                            'list': 'RDFILRj44S7w0',
                            'index': '0',
                            'startSeconds': '0',
                            'suggestedQuality': 'hd720'});

}

function onStateChange(event) {
  if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED ||
      event.data == YT.PlayerState.CUED) {
    playing = false;
  }
  else if (event.data == YT.PlayerState.PLAYED || event.data == YT.PlayerState.BUFFERING) {
    playing = true;
  }
}


var skip_btn = document.getElementsByName('skip-btn')[0];
skip_btn.addEventListener('click', nextVideo)


function pause_play() {
  if (playing == true) {
    player.pauseVideo();
    playing = false;
  } else {
    player.playVideo();
    playing = true;
  }
}

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

evtSrc.addEventListener('pause_play', function(e) {
  console.log(e.data);
  logEntry("Recieved a PUSH event to pause/play video.");
  pause_play();
});
