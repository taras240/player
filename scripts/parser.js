let playerElement = document.getElementById("player__songs");
let loadedPages = 0;
let req = "";
let loadedSongs = 0;

function searchSongs(request, moreSongs = false) {
  setSongToDefaultState(playedElement);
  let pagesCount = 3;
  if (!moreSongs) {
    loadedPages = 0;
    loadedSongs = 0;
    playerElement.innerHTML = "";
    req = request;
  }
  let startPage = loadedPages + 1;

  for (let i = startPage; i < startPage + pagesCount; i++) {
    let url = `https://spcs.pro/music/user/taras240/list/-/p${i}/`;
    let proxy = "https://api.codetabs.com/v1/proxy?quest=";
    // proxy = "";
    fetch(proxy + url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        parse(response);
        // playerElement.innerHTML = response;
        // console.log(response);
      });
    loadedPages++;
  }
}
function customSearch(url) {
  // playerElement.innerHTML = "";
  // let pagesCount = 5;
  // for (let i = pagesCount; i > 0; i--) {
  //   let url = `https://spcs.life/musicat/artist/stepan-giga-22743/tracks/p${i}/`;
  //   let proxy = "https://api.codetabs.com/v1/proxy?quest=";
  //   fetch(proxy + url)
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((response) => {
  //       parse(response);
  //     });
  // }
}
function parse(html) {
  html = new DOMParser().parseFromString(html, "text/html");
  let songArticles = html.body.getElementsByClassName("block oh bord-botm");
  for (let i = 0; i < songArticles.length; i++) {
    try {
      let url = songArticles[i]
        .getElementsByTagName("a")[1]
        .getAttribute("href");
      let songName = songArticles[i]
        .getElementsByClassName("m break-word darkblue break-word")[0]
        .innerText.split("-");
      addSong(url, songName);
    } catch {}
  }
}

function addSong(url, songName) {
  loadedSongs++;
  playerElement.innerHTML += `<div class="player__song" onclick="changeSong(this, event)" href = "${url}">
    <input class="player__seek-bar" oninput="seek(this)" type="range" min="0" max="100" value="0" >
     <div class="progress-bar"></div>
    <div class="song-container" >
      <div><span class="player__song-number">${loadedSongs}</span>
        <div class="song__control-buttons">
          <button class="player__play-button" onclick="playPressed(this)"></button>
          <button class="player__next-button" onclick="nextSong(event)" ></button>
          <div class="player__volume-bar">
            <div class="volume-slider-icon" onclick="mute(this)"></div>
            <input class="volume-slider-slider" oninput="changeVolume(this)" type="range" min="0" max="100" value="100" >
          </div>    
        </div>
      <p class="player__song-name">
        <span class="player__song-artist">${songName[0]}
          <button class="player__artist-button" onclick="searchArtists(this,event)"></button>
        </span>
        <span class="song-name-separator"> - </span>

        <span class="player__song-title">${songName[1]}</span>
      </p>
      <p class="player__song-time"></p>
    </div>
    <div>
    <p class="player__song-lenght"></p>
    <div class="song__control-buttons">
    <a
                  class="player__download-button"
                  href="${url}" download
                ></a></div></div></div>
</div>`;
}
