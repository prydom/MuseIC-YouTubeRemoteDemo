window.onload = function () {
  // twitter.js
  // var skip = document.createElement('script');
  // skip.src = chrome.extension.getURL('scripts/skip.js');
  // document.getElementsByTagName('body')[0].appendChild(skip);
  // console.log("YoutubeSkip injection is ready!");
  
  // main.js
  var sm = document.createElement('script');
  sm.src = chrome.extension.getURL('scripts/main.js');
  document.getElementsByTagName('body')[0].appendChild(sm);
}
