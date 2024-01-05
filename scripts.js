console.log("Welcome to Spotify");
let songIndex = 0;
let i=0;
let audioElement = new Audio('/songs/1.mp3');
let masterplay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif =  document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    { songName: "Abc", filePath: "/songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Abc", filePath: "/songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Abc", filePath: "/songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Abc", filePath: "/songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Abc", filePath: "/songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Abc", filePath: "/songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Abc", filePath: "/songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Abc", filePath: "/songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Abc", filePath: "/songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Abc", filePath: "/songs/10.mp3", coverPath: "covers/10.jpg" },

]
songItems.forEach((element) => {
    const imgElement = element.getElementsByTagName("img")[0];
    const songNameElement = element.getElementsByClassName("songName")[0];

    if (imgElement && songNameElement) {
        imgElement.src = songs[i].coverPath;
        songNameElement.innerText = songs[i].songName;
        i++;
    }
    console.log(element)
});


masterplay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress; 
});

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to the first song if it reaches the end
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
});

myProgressBar.addEventListener('change' , () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click' , (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click' , () => {
    if(songIndex >= 9){
        songIndex = 0;
    } else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0 ) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})