const musicContainer = document.getElementById("music-container");
const playButton = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const volume = document.querySelector("#volume");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 0;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.replace("fa-play", "fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.replace("fa-pause", "fa-play");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function updateVolume() {
  audio.volume = volume.value;
  //   console.log(parseFloat(volume.value));
  if (parseFloat(volume.value) < 0.6 && parseFloat(volume.value) > 0.1) {
    document.querySelector(".volume-info i").className = "fa fa-volume-down";
  } else if (parseFloat(volume.value) < 0.1) {
    document.querySelector(".volume-info i").className = "fa fa-volume-off";
  } else if (parseFloat(volume.value) > 0.6) {
    document.querySelector(".volume-info i").className = "fa fa-volume-up";
  }
}

playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
volume.addEventListener("change", updateVolume);
