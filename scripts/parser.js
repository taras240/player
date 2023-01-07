let debug = document.getElementById("debug");
let res;
let url;
let playerElement = document.getElementById("player__songs");

function searchSongs(request) {
  playerElement.innerHTML = "";
  let pagesCount = 5;

  for (let i = 1; i <= pagesCount; i++) {
    url = `https://spcs.life/musicat/search/index/?Link_id=391593&T=28&P=${i}?Vck=848629&dtype=touch_light&sq=${request}`;
    let proxy = "https://api.codetabs.com/v1/proxy?quest=";
    fetch(proxy + url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        parse(response);
      });
  }
}
function parse(html) {
  html = new DOMParser().parseFromString(html, "text/html");
  let songArticles = html.body.getElementsByClassName("__adv_list_track");
  for (let i = 0; i < songArticles.length; i++) {
    try {
      let url = songArticles[i]
        .getElementsByTagName("a")[1]
        .getAttribute("href");
      let songName = songArticles[i].innerText.split(":");
      addSong(url, songName);
    } catch {}
  }
}

function addSong(url, songName) {
  playerElement.innerHTML += `<div class="player__song" href = "${url}">
  <input class="player__seek-bar" disabled type="range" min="0" max="100" value="0" class="progress">
    <div class="song-container">
    <div>
    <button class="player__play-button" onclick="playPressed(this)"></button>
    
    <p class="player__song-name">
        <span class="player__song-artist">${songName[0]}</span>
        <span class="player__song-title">${songName[1]}</span>
    </p><p class="player__song-time"></p></div>
    <div>
    <p class="player__song-lenght"></p>
    <a
                  class="player__download-button"
                  href="${url}"
                ></a></div></div>
</div>`;
}
