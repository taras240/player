// let musicUri =
//   "http://ms02.spac.me/m/002038029179188231042164245162018170240047235125132139144205/1672952712/119205475/0/dff554da16a72d1951504b1392454995/04._Pots_And_Stove_%28Feat._Boosie_Badazz_%26amp;_Quick%29.mp3";

// let volumeBar = document.getElementById("volume");
// let volLevel = document.getElementById("volume-level");
// volLevel.innerText = volumeBar.value;
// volumeBar.oninput = function () {
//   volLevel.textContent = this.value;
//   Howler.volume(this.value / 100);
// };
let progress = document.getElementsByClassName("player__seek-bar")[0];

let sound;
let time;
let playedElement = 0;
function updateElement() {
  time = playedElement.getElementsByClassName("player__song-lenght")[0];
  progress = playedElement.getElementsByClassName("player__seek-bar")[0];
  progress.oninput = function () {
    sound.seek((this.value / 100) * sound.duration());
  };
}
function playPressed(element) {
  if (playedElement == 0) {
    playedElement = element.parentNode;
  }
  if (playedElement != 0 && element.parentNode != playedElement) {
    Howler.stop();
    playedElement.getElementsByClassName("player__play-button")[0].className =
      "player__play-button";
    playedElement.getElementsByClassName("player__seek-bar")[0].value = 0;
    // playedElement.classList.remove("paused");

    playedElement = element.parentNode;
  }
  if (element.classList.contains("played")) {
    sound.pause();
    element.classList.remove("played");
    element.classList.add("paused");
  } else if (element.classList.contains("paused")) {
    sound.play();
    element.classList.add("played");
    element.classList.remove("paused");
  } else {
    sound = new Howl({
      src: getUrl(element),
      /*src: ["./audio/80s_vibe.mp3"],*/
      html5: true,
    });
    sound.play();
    element.classList.add("played");
    element.classList.remove("paused");
    updateElement();
    timer = setInterval(timerTick, 300);
  }
}
let timer;
function timerTick() {
  time.textContent =
    "[ -" +
      formatTime(Math.round(sound.duration() - sound.seek())) +
      "/" +
      formatTime(Math.round(sound.duration())) +
      " ]" || 0;
  progress.value =
    Math.round(100 * sound.seek()) / Math.round(sound.duration());
}
function formatTime(secs) {
  var minutes = Math.floor(secs / 60) || 0;
  var seconds = secs - minutes * 60 || 0;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function getUrl(element) {
  return element.parentNode.getAttribute("href");
}

function search() {
  let req = document.getElementById("search-bar").value;
  searchSongs(req);
}
