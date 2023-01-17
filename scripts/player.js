function changeVolume(element) {
  Howler.volume(element.value / 100);
}
let progress = document.getElementsByClassName("player__seek-bar")[0];
let progressBar = document.getElementsByClassName("progress-bar")[0];
let sound;
let time;
let playedElement;
let timer;

function keyPressed(key) {
  if (key == "Enter") {
    search();
  }
}
function hidePlayedElement(element) {}
function mute(e) {
  sound.mute(!sound.mute());
}
function seek(element) {
  sound.seek((element.value / 100) * sound.duration());
  progressBar.style.width = element.value + "%";
}
function updateElement() {
  time = playedElement.getElementsByClassName("player__song-lenght")[0];
  playedElement.classList.add("active");
  progressBar = playedElement.getElementsByClassName("progress-bar")[0];
  progress = playedElement.getElementsByClassName("player__seek-bar")[0];
  document.title =
    playedElement.getElementsByClassName("player__song-title")[0].innerText;
  playedElement.getElementsByClassName("volume-slider-slider")[0].value =
    Howler.volume() * 100;
}
function changeSong(element) {
  if (!element.classList.contains("active")) {
    playPressed(element.getElementsByClassName("player__play-button")[0]);
  }
}
function setSongToDefaultState(element) {
  if (!element) return;
  element.getElementsByClassName("player__play-button")[0].className =
    "player__play-button";
  element.getElementsByClassName("player__seek-bar")[0].value = 0;
  element.classList.remove("active");
  element.getElementsByClassName("volume-slider-icon")[0].style.opacity = 1;
  element.getElementsByClassName("volume-slider-slider")[0].style.display =
    "block";
}
function playPressed(elementPlayButton) {
  element = elementPlayButton.parentNode.parentNode.parentNode.parentNode;
  if (playedElement == undefined) {
    playedElement = element;
  }
  if (playedElement != 0 && element != playedElement) {
    Howler.stop();
    setSongToDefaultState(playedElement);
    playedElement = element;
  }
  if (elementPlayButton.classList.contains("played")) {
    sound.pause();
  } else if (elementPlayButton.classList.contains("paused")) {
    sound.play();
  } else {
    elementPlayButton.classList.add("loading");
    sound = new Howl({
      src: getUrl(element),
      html5: true,
      onmute: () => {
        playedElement.getElementsByClassName(
          "player__volume-bar"
        )[0].className = sound.mute()
          ? "player__volume-bar muted"
          : "player__volume-bar";
      },
      onload: () => {
        elementPlayButton.classList.remove("loading");
      },
      onplay: function () {
        timer = setInterval(timerTick, 500);
        elementPlayButton.classList.add("played");
        elementPlayButton.classList.remove("paused");
      },
      onpause: function () {
        clearTimeout(timer);
        elementPlayButton.classList.remove("played");
        elementPlayButton.classList.add("paused");
      },
      onstop: function () {
        clearTimeout(timer);
      },
      onend: nextSong,
    });
    sound.play();

    updateElement();
  }
}

function timerTick() {
  time.textContent = formatTime(Math.round(sound.duration()));
  let songPosition =
    sound.seek() > 0
      ? Math.round(100 * sound.seek()) / Math.round(sound.duration())
      : 0;
  progress.value = songPosition;
  progressBar.style.width = songPosition + "%";
}
function formatTime(secs) {
  if (secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = secs - minutes * 60 || 0;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return "0:00";
}

function getUrl(element) {
  return element.getAttribute("href");
}

function search() {
  let req = document.getElementById("search-bar").value;
  searchSongs(req);
}

function nextSong() {
  let nextElement = playedElement?.nextSibling?.getElementsByClassName(
    "player__play-button"
  )[0]
    ? playedElement?.nextSibling?.getElementsByClassName(
        "player__play-button"
      )[0]
    : playedElement.parentNode.childNodes[0]?.getElementsByClassName(
        "player__play-button"
      )[0];
  playPressed(nextElement);
  nextElement.scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });
}
document.body.onload = () => {
  searchSongs("relax music");
};
