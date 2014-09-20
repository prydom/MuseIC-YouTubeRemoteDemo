var log = document.getElementById('log-list');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
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

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.loadPlaylist({'listType': 'playlist', 
                            'list': 'RDFILRj44S7w0',
                            'index': '0',
                            'startSeconds': '0',
                            'suggestedQuality': 'hd720'});
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

var skip_btn = document.getElementsByName('skip-btn')[0];
skip_btn.addEventListener('click', nextVideo)
var done = false;


function nextVideo() {
  player.nextVideo();
  var newEntry = document.createElement('li');
  var text = document.createTextNode('Skipped to next video.');
  newEntry.appendChild(text);
  log.appendChild(newEntry);
}
