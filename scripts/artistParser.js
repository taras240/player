// let playerElement = document.getElementById("player__songs");

function searchArtists(request, event = null) {
  event?.stopImmediatePropagation();

  let pagesCount = 1;
  playerElement.innerHTML = "";

  let startPage = 1;

  for (let i = startPage; i < startPage + pagesCount; i++) {
    let url = `https://spcs.life/musicat/search/index/?Link_id=170216&T=26&sq=${request}`;
    let proxy = "https://api.codetabs.com/v1/proxy?quest=";
    fetch(proxy + url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        parseArtists(response);
      });
    loadedPages++;
  }
}
function parseArtists(html) {
  //   console.log("cont");

  html = new DOMParser().parseFromString(html, "text/html"); //wrap_nbb
  let artistArticles = html.body.getElementsByClassName("oh pre_content_wrap");
  for (let i = 0; i < artistArticles.length; i++) {
    try {
      let url = artistArticles[i]
        .getElementsByTagName("a")[0]
        .getAttribute("href");
      let artistgName =
        artistArticles[i].getElementsByTagName("b")[0].innerText;
      addArtist(url, artistgName);
    } catch {}
  }
}
function addArtist(url, artistName) {
  playerElement.innerHTML += `
        <div class="player__artist" onclick="changeArtist(this)" href = "${url}">
            <div class="artist-container" >
                <div>
                    <p class="player__song-name">
                        <span class="player__artist-name">${artistName}</span>
                    </p>
                </div>
            <div>
        </div>
   `;
}
// let artistName = "";
function changeArtist(element) {
  artistName = element.innerText;
  getArtistSongs(getUrl(element));
}
function getArtistSongs(request, moreSongs = false) {
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
    let url = `${request}/tracks/p${i}/?Link_id=1030621`;
    let proxy = "https://api.codetabs.com/v1/proxy?quest=";
    fetch(proxy + url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        parseArtistSongs(response);
      });
    loadedPages++;
  }
}
function parseArtistSongs(html) {
  html = new DOMParser().parseFromString(html, "text/html");
  let songArticles = html.body.getElementsByClassName("__adv_list_track");
  for (let i = 0; i < songArticles.length; i++) {
    try {
      let url = songArticles[i]
        .getElementsByTagName("a")[1]
        .getAttribute("href");
      let songName = [
        "",
        songArticles[i].getElementsByClassName("oh")[0].innerText,
      ];
      addSong(url, songName);
    } catch {}
  }
}
