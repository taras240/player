// let musicUri =
//   "http://ms02.spac.me/m/002038029179188231042164245162018170240047235125132139144205/1672952712/119205475/0/dff554da16a72d1951504b1392454995/04._Pots_And_Stove_%28Feat._Boosie_Badazz_%26amp;_Quick%29.mp3";

let volumeBar = document.getElementById("volume");
let volLevel = document.getElementById("volume-level");
volLevel.innerText = volumeBar.value;
volumeBar.oninput = function () {
  volLevel.textContent = this.value;
  Howler.volume(this.value / 100);
};
let progress = document.getElementById("progress");
progress.oninput = function () {
  sound.seek((this.value / 100) * sound.duration());
};
let sound;
let playBtn = document.getElementsByClassName("player__play-button")[0];
let pauseBtn = document.getElementsByClassName("player__pause-button")[0];
let time = document.getElementsByClassName("player__song-lenght")[0];
let playedElement = 0;
function playPressed(element) {
  if (playedElement == 0) {
    playedElement = element;
  }
  if (playedElement != 0 && element != playedElement) {
    Howler.stop();
    playedElement.className = "player__play-button";
    // playedElement.classList.remove("paused");

    playedElement = element;
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
