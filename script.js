document.addEventListener("DOMContentLoaded", () => {
  const songs = [
    {
      src:"audio/Adele - Skyfall (Official Lyric Video) (128 kbps).mp3",
      title:"Skyfall",
      artist:"Adele",
      album:"Skyfall",
    },
    {
      src:"audio/Nirvana - Something In The Way (Audio) (128 kbps).mp3",
      title:"Something In The Way",
      artist:"Nirvana",
      album:"Nevermind"
    },
    {
      src:"audio/Two Faced (Official Music Video) - Linkin Park (128 kbps).mp3",
      title:"Two Faced",
      artist:"Linkin Park",
      album:"From Zero"
    },
    {
      src:"audio/Anthem-Of-Martin-Kannada-AP-Arjun-Mani-Sharma-Roll-Rida-Prudhvi-Chandra.mp3",
      title:"Anthem Of Martin",
      artist:"Mani Sharma, Roll Rida, Prudhvi Chandra",
      album:"Martin"
    },
    {
      src:"audio/Ba-Ba-Ba-Na-Ready-Vyasaraj-Sosale-Aniruddha-Sastry-Suprith-Phalguna-Nikhil-Parthasarathy-Santhosh.mp3",
      title:"Ba Ba Ba Na Ready",
      artist:"Vyasaraj Sosale, Aniruddha Sastry, Suprith Phalguna, Nikhil Parthasarathy, Santhosh",
      album:"Roberrt"
    },
    {
      src:"audio/Baby-Dance-Floor-Ready-Nakash-Aziz-Aishwarya-Rangarajan.mp3",
      title:"Baby Dance Floor Ready",
      artist:"Nakash Aziz, Aishwarya Rangarajan",
      album:"Roberrt"
    },
    {
      src:"audio/Bad-Boys-MC-Bijju-Rahul-Dit-o.mp3",
      title:"Bad Boys",
      artist:"MC Bijju, Rahul Dito",
      album:"Bheema"
    },
    {
      src:"audio/Banda-Bandaa-Shankar-Mahadevan.mp3",
      title:"Banda Bandaa",
      artist:"Shankar Mahadevan",
      album:"Banda Bandaa"
    },
    {
      src:"audio/bensound-littleidea.mp3",
      title:"Bensound",
      artist:"littleidea",
      album:"Bensound"
    },
    {
      src:"audio/College-Days-Nakul-Abhyankar-Aishwarya-Rangarajan-Keerthan-Holla-Ramya-Bhat-Abhyankar.mp3",
      title:"College Days",
      artist:"Nakul Abhyankar, Aishwarya Rangarajan, Keerthan Holla, Ramya Bhat Abhyankar",
      album:"College Days"
    }

  ];

  // Path to your images folder
const imageFolder = "./images/";

// List of image filenames
const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg"];

// Get the image element
const songImage = document.getElementById("song-image");

// Function to assign a random image to the current song
function setRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = `${imageFolder}${images[randomIndex]}`;
  songImage.src = randomImage;
}

  let currentSongIndex = 0;
  const audioPlayer = document.getElementById("audio-player");
  const songTitle = document.getElementById("song-title");
  const artistAlbum = document.getElementById("artist-album");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalDurationDisplay = document.getElementById("total-duration");
  const playlist = document.getElementById("playlist");
  const playlistMenuBtn = document.getElementById("playlist-menu-btn");
  const playlistDrawer = document.getElementById("playlist-drawer");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const volumeSlider = document.getElementById("volume-slider");

  // Load the playlist dynamically
  function loadPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.classList =
        "cursor-pointer p-2 bg-gray-700 rounded hover:bg-green-500 hover:text-white";
      li.dataset.index = index;
      li.addEventListener("click", () => loadSong(index));
      playlist.appendChild(li);
    });
  }

  // Load a song
  function loadSong(index,init=true) {
    const song = songs[index];
    currentSongIndex = index;
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistAlbum.textContent = `${song.artist} - ${song.album}`;
    audioPlayer.play();
    setRandomImage(); // Set a random image for the song
    init?updatePlayPauseIcon(true):updatePlayPauseIcon(false);
  }


  // Update play/pause button icon
  function updatePlayPauseIcon(isPlaying) {
    playPauseBtn.innerHTML = isPlaying
      ? '<i class="bi bi-pause-fill"></i>'
      : '<i class="bi bi-play-fill"></i>';
  }

  // Play or pause the song
  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      updatePlayPauseIcon(true);
    } else {
      audioPlayer.pause();
      updatePlayPauseIcon(false);
    }
  }

  // Play the previous song
  function playPrevious() {
    currentSongIndex =
      (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
  }

  // Play the next song
  function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
  }

  // Update the progress bar
  function updateProgressBar() {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  }

  // Seek to a specific part of the song
  function seekSong() {
    const seekTo = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTo;
  }

  // Format time in mm:ss format
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  // Update total duration
  function updateTotalDuration() {
    totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
  }

  // Adjust volume
  function adjustVolume() {
    audioPlayer.volume = volumeSlider.value;
  }

  // Playlist drawer toggle
  function togglePlaylistDrawer() {
    playlistDrawer.classList.toggle("translate-x-full");
  }

  // Event Listeners
  playPauseBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", playPrevious);
  nextBtn.addEventListener("click", playNext);
  progressBar.addEventListener("input", seekSong);
  volumeSlider.addEventListener("input", adjustVolume);
  playlistMenuBtn.addEventListener("click", togglePlaylistDrawer);
  closeDrawerBtn.addEventListener("click", togglePlaylistDrawer);
  audioPlayer.addEventListener("timeupdate", updateProgressBar);
  audioPlayer.addEventListener("loadedmetadata", updateTotalDuration);
  audioPlayer.addEventListener("ended", playNext);

  // Initialize
  loadPlaylist();
  loadSong(currentSongIndex,init=false);
});
