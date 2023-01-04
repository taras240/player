let musicUri =
  "//ms08.spac.me/m/082143054170081013093162026054146213057230216219187255120180/1672873611/100497807/0/ac367ece022b32fa06077347fdb5bac7/Europa-The_Final_Countdown-spcs.life.mp3";

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
function playPressed(element) {
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
      src: musicUri,
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
