const expandIcon = document.getElementById("expand-icon")
const songsListContainer = document.getElementById("songs-list-container")
const songsList = document.getElementById("songs-list")
const musicPlayerContainer = document.getElementById("music-player-container")
const playBtn = document.getElementById("play-btn")
const playIcon = document.getElementById("play-icon")
const imageTag = document.getElementById("track-image")
const songName = document.getElementById("track-name")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const progressBar = document.getElementById("progress")
const volumeBar = document.getElementById("volume")

let currSongIdx = 0
const songsInfo = [
{
    name : "Stylish Deep Electronic",
    img : "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    trackName : "nveravetyanmusic-stylish-deep-electronic-262632.mp3"
},
{
    name : "Soundscape Ambient",
    img : "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    trackName : "stereo_color-soundscape-ambient-484749.mp3"
},
{
    name : "Sweet Life Chill",
    img : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    trackName : "alexgrohl-sweet-life-luxury-chill-438146.mp3"
},
{
    name : "Night Drive Synthwave",
    img : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    trackName : "music-for-videos-night-drive-90s-synthwave-stargirl-180569.mp3"
}
]

let song = new Audio(`./media/${songsInfo[0].trackName}`)
song.volume = 0.5

function loadSong(index){
    currSongIdx = index
    song.src = `./media/${songsInfo[index].trackName}`
    imageTag.src = songsInfo[index].img
    songName.innerText = songsInfo[index].name
    highlightActive()
}

function playSong(){
    playIcon.classList.replace("fa-play","fa-pause")
    song.play()
}

function pauseSong(){
    playIcon.classList.replace("fa-pause","fa-play")
    song.pause()
}
songsInfo.forEach((item,index)=>{
    const p = document.createElement("p")
    p.innerText = item.name
    p.classList.add("songItem")
    songsList.appendChild(p)

    p.addEventListener("click",()=>{
        loadSong(index)
        playSong()
    })
})

function highlightActive(){
    document.querySelectorAll(".songItem").forEach((el,i)=>{
        el.classList.toggle("activeSong", i===currSongIdx)
    })
}

playBtn.addEventListener("click",()=>{
    song.paused ? playSong() : pauseSong()
})

nextBtn.addEventListener("click",()=>{
    loadSong((currSongIdx+1)%songsInfo.length)
    playSong()
})

prevBtn.addEventListener("click",()=>{
    loadSong((currSongIdx-1+songsInfo.length)%songsInfo.length)
    playSong()
})

song.addEventListener("timeupdate",()=>{
    if(song.duration){
        progressBar.value = (song.currentTime/song.duration)*100
    }
})

progressBar.addEventListener("input",()=>{
    if(song.duration){
        song.currentTime = (progressBar.value*song.duration)/100
    }
})

volumeBar.addEventListener("input",()=>{
    song.volume = volumeBar.value/100
})

song.addEventListener("ended",()=>{
    loadSong((currSongIdx+1)%songsInfo.length)
    playSong()
})

expandIcon.addEventListener("click",()=>{
    if(songsListContainer.style.display!=="none"){
        songsListContainer.style.display="none"
        musicPlayerContainer.style.width="100%"
        expandIcon.classList.replace("fa-arrow-right","fa-arrow-left")
    }else{
        songsListContainer.style.display="block"
        musicPlayerContainer.style.width="75%"
        expandIcon.classList.replace("fa-arrow-left","fa-arrow-right")
    }
})

loadSong(0)