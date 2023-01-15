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
let progressBar = document.getElementsByClassName("progress-bar")[0];
let sound;
let time;
let playedElement;
function keyPressed(key) {
  if (key == "Enter") {
    search();
  }
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
}
function changeSong(element) {
  if (!element.classList.contains("active")) {
    playPressed(element.getElementsByClassName("player__play-button")[0]);
  }
}
function playPressed(elementPlayButton) {
  element = elementPlayButton.parentNode.parentNode.parentNode.parentNode;
  if (playedElement == undefined) {
    playedElement = element;
  }
  if (playedElement != 0 && element != playedElement) {
    Howler.stop();
    playedElement.getElementsByClassName("player__play-button")[0].className =
      "player__play-button";
    playedElement.getElementsByClassName("player__seek-bar")[0].value = 0;
    playedElement.classList.remove("active");
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

      onend: nextSong,

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
    });
    sound.play();

    updateElement();
  }
}
let timer;
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
  searchSongs("Ілля найда");
};
