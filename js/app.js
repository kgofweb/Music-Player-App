// DOM elements
const phone = document.querySelector('.phone');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

const timeStart = document.getElementById('time-start');
const timeEnd = document.getElementById('time-end');

const volumeShow = document.getElementById('volume-show');
const volumeChange = document.getElementById('volume-change');
const recentVolume = document.getElementById('volume-change');
const muteVolume = document.getElementById('mute-volume');
const activeVolume = document.getElementById('active-volume');

// Songs title
const songs = ['Flux', 'How Deep Is Too Deep', 'Walls Talking', 'Humble', "Dont Start Now", 'Wish Wish'];
const artistSong = ['Ellie Goulding', 'Ellie Goulding', 'Kevin Gates', 'Kendrick Lamar', 'Dua Lipa', 'Dj Khaled, Cardi B, King Savage'];

// Keep track of songs
let songIndex = 1;
let artistIndex = 1;

// Init load song info DOM
loadSong(songs[songIndex]);

// Update songs details
function loadSong(song)  {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;

  // Update artist name
  loadArtist(artistSong[artistIndex]);
}

function loadArtist(name) {
  artist.innerText = name;
}

// Event listener
playBtn.addEventListener('click', playMusic);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', endSong);
volumeChange.addEventListener('change', changeVolume);
muteVolume.addEventListener('click', muteSong);
activeVolume.addEventListener('click', activeSong);

function playMusic() {
  const isPlaying = phone.classList.contains('play');

  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  phone.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  // Play music
  audio.play();
}

function pauseSong() {
  phone.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  // Pause music
  audio.pause();
}

function prevSong() {
  songIndex--;
  artistIndex--;

  if(songIndex < 0 && artistIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = artistSong.length - 1;
  }

  loadSong(songs[songIndex]);
  loadArtist(artistSong[artistIndex]);

  playSong();
}

function nextSong() {
  songIndex++;
  artistIndex++;

  if(songIndex > songs.length - 1 && artistIndex > artistSong.length - 1) {
    songIndex = 0;
    artistIndex = 0
  }

  loadSong(songs[songIndex]);
  loadArtist(artistSong[artistIndex]);

  playSong();
}

function updateProgress(e) {
  // We need the music currentTime and duration of music
  // console.log(Math.round(e.srcElement.currentTime));
  // console.log(e.srcElement.duration);

  // Get duration and current Time
  const { duration, currentTime } = e.srcElement;
  // Get progress Percent
  const progressPercent = (currentTime / duration) * 100;

  
  progress.style.width = `${progressPercent}%`;
  convertTime(Math.round(audio.currentTime));
}

function setProgress(e) {
  // Get progress container width
  const width = this.clientWidth;
  // Get position of click
  const clickX = e.offsetX;
  // console.log(clickX);
  // Get duration
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function endSong() {
  nextSong();
}

// Work with time
function convertTime(seconds) {
  // console.log(Math.round(audio.currentTime));
  // console.log(Math.round(audio.duration));
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  timeStart.innerText =  `${min}:${sec}`;

  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  if(!audio.duration) {
    timeEnd.innerText = `00:00`;
  } else {
    timeEnd.innerText = `${min}:${sec}`;
  }
}

// Set volume
function changeVolume() {
  volumeShow.innerText = recentVolume.value;
  audio.volume = recentVolume.value / 100;
}

function muteSong() {
  audio.volume = 0;
  volume.value = 0;
  // volumeShow.innerText = volume.value;
}

function activeSong() {
  audio.volume = 1;
  volume.value = audio.volume;
  // volumeShow.innerText = volume.value;
}