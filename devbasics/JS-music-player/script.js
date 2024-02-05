const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');

const songs = ["Circles - Post Malone", "Final Girl - Jeremy Blake" , "Layer Cake - John Patitucci" , "Lazy Laura - Quincas Moreira" , "Time Slips By - Go By Ocean _ Ryan McCaffrey"];

let songIndex = 0;
let repeat = false;
let shuffle = false;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `mus/` + song + '.mp3';
    cover.src = `images.jpg`;
}

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");
    audio.pause();
}

function repeatSong() {
    repeat = !repeat;
    cssupdate(repeat, repeatBtn);

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

    if(repeat){
        loadSong(songs[songIndex]);
        playSong();
        return;
    }

    if(shuffle){
        songIndex = randomIndex(songIndex);
        loadSong(songs[songIndex]);
        playSong();
        return;
    }

    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function shuffleSong() {
    shuffle = !shuffle;
    cssupdate(shuffle, shuffleBtn);
}

function cssupdate(state, button) {
    if(state){
        button.style.color = "#ee09ee";
    }

    else{
        button.style.color = "#dfdbdf";
    }
}

function randomIndex(curIndex) {
    let randIndex;
    do{
        randIndex = Math.floor(Math.random() * ((songs.length - 1) - 0));
    } while(curIndex === randIndex)

    return randIndex;
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPerCent = (currentTime / duration) * 100;
    progress.style.width = `${progressPerCent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener("click", () => {
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
repeatBtn.addEventListener("click", repeatSong);
shuffleBtn.addEventListener("click", shuffleSong);

audio.addEventListener("ended", nextSong);
