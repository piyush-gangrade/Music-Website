
let songIndex = 0;
let playButtonTarget;
let songDuration;
let progressBar = document.getElementById("song-range");
let masterPlay = document.getElementById("play");
let audioElement = new Audio("Songs/Night-Changes.mp3");
let songItems = document.getElementsByClassName("items");
let masterForward = document.getElementById("forward");
let masterBackward = document.getElementById("backward");
let barSongName = document.getElementById("barSongName");
let barSongImg = document.getElementById("barSongImg");


const songList = [
    {
        songName: "Night Changes" ,
        filePath: "Songs/Night-Changes.mp3",
        coverPath: "Images/night-changes.jpeg"
    },
    {
        songName: "Carol of the bells" ,
        filePath: "Songs/Carol-of-the-Bells.mp3",
        coverPath: "Images/carol-of-the-bells.jpg"
    },
    {
        songName: "Ijazat" ,
        filePath: "Songs/Ijazat.mp3",
        coverPath: "Images/Ijazat.jpeg"
    },
    {
        songName: "Cure for Me" ,
        filePath: "Songs/Cure_For_Me.mp3",
        coverPath: "Images/CureForMe.jpg"
    },
    {
        songName: "Flowers" ,
        filePath: "Songs/Flowers.mp3",
        coverPath: "Images/flowers.jpg"
    },
    {
        songName: "Kabhi Kabhi Aditi" ,
        filePath: "Songs/kabhi-kabhi-aditi.mp3",
        coverPath: "Images/Kabhi Kabhi Aditi.jpg"
    },
    {
        songName: "Suzume" ,
        filePath: "Songs/Suzume.mp3",
        coverPath: "Images/Suzume.jpg"
    }

]
//Time Stamp
Array.from(document.getElementsByClassName("timeStamp")).forEach((element,i)=>{

function getAudioDuration(audioSource) {
    let audio = new Audio();
    audio.src = audioSource;
    audio.addEventListener('loadedmetadata', function() {
        let durationInSeconds = Math.floor(audio.duration);
        let durationInMinutes = Math.floor(durationInSeconds / 60);
        durationInSeconds = (durationInSeconds%60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        
        songDuration= `${(durationInMinutes)}:${(durationInSeconds)}`;
        //console.log(songDuration);
        element.innerText = songDuration;
  });
  
    audio.load();
  }
  getAudioDuration(songList[i].filePath)
});
//add images and song name in song items
Array.from(songItems).forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songList[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songList[i].songName;
});
//play, pause, previous and next 

//play and pause
masterPlay.addEventListener("click", function () {
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        
        document.getElementById(`${songIndex}`).classList.add("fa-pause");
        document.getElementById(`${songIndex}`).classList.remove("fa-play");
    } 
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,i)=>{
    element.addEventListener("click",()=>{
        songIndex = i;
        console.log();
    })
});

//next
function forward() {
    if(songIndex >= 6){
        songIndex = 0;
        //console.log(songIndex);
    }
    else{
        songIndex++;
        //console.log(songIndex);
    }
    audioElement.src = songList[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    barSongImg.src = songList[songIndex].coverPath;
    barSongName.innerText = songList[songIndex].songName;
    makeAllPlay();
    document.getElementById(`${songIndex}`).classList.remove("fa-play");
    document.getElementById(`${songIndex}`).classList.add("fa-pause");
} 

masterForward.addEventListener("click",() => {
    forward();
        // e.target.classList
        // e.target.classList.add("fa-pause");

});


//previous
masterBackward.addEventListener("click",() => {
    if(songIndex <= 0){
        songIndex = 6;
        //console.log(songIndex);
    }
    else{
        songIndex--;
        //console.log(songIndex);
    }
    audioElement.src = songList[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    barSongImg.src = songList[songIndex].coverPath;
    barSongName.innerText = songList[songIndex].songName;
    makeAllPlay();
    document.getElementById(`${songIndex}`).classList.remove("fa-play");
    document.getElementById(`${songIndex}`).classList.add("fa-pause");
        // e.target.classList.remove("fa-play");
        // e.target.classList.add("fa-pause");
       
})

//Progress Bar
progressBar.addEventListener("input", () => {
    audioElement.removeEventListener("timeupdate", updateTime);

    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    audioElement.addEventListener("timeupdate", updateTime);
    

});

function updateTime() {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
    if(progressBar.value == 100){
        forward();
    }
    //console.log(progress);
}
audioElement.addEventListener("timeupdate", updateTime);

//play song items
function makeAllPlay() {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,i)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlay();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = songList[i].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        barSongImg.src = songList[i].coverPath;
        barSongName.innerText = songList[i].songName;
    })
})

