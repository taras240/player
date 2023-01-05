let debug = document.getElementById("debug");
// debug.innerText = await (await fetch("//spaces.ru")).text();
let res;
let url;
// "https://spcs.life/musicat/search/index/?Link_id=1259302&T=28&sq=scooter";
let playerElement = document.getElementById("player__songs");

function searchSongs(request) {
  url = `https://spcs.life/musicat/search/index/?Link_id=1259302&T=28&sq=${request}`;
  fetch("https://api.codetabs.com/v1/proxy?quest=" + url)
    .then((response) => response.text())
    .then((response) => {
      res = response;
      parse(response);
    });
}
// document.getElementsByTagName("a")[0].getAttribute("href")
function parse(html) {
  playerElement.innerHTML = "";
  html = new DOMParser().parseFromString(html, "text/html");
  let songArticles = html.body.getElementsByClassName("__adv_list_track");
  for (let i = 0; i < songArticles.length; i++) {
    let url = songArticles[i].getElementsByTagName("a")[1].getAttribute("href");
    let songName = songArticles[i].innerText.split(":");
    addSong(url, songName);
  }
}

function addSong(url, songName) {
  playerElement.innerHTML += `<div class="player__song" href = "${url}">
  <input class="player__seek-bar" type="range" min="0" max="100" value="0" class="progress">

    <button class="player__play-button" onclick="playPressed(this)"></button>
    <p class="player__song-name">
        <span class="player__song-artist">${songName[0]}</span>
        <span class="player__song-title">${songName[1]}</span>
    </p><p class="player__song-time"></p>
    <p class="player__song-lenght"></p>
</div>`;
}