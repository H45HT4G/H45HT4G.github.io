    //  album and song info variables

    let artistName = document.querySelector('.js-artist');
    let songName = document.querySelector('.js-name');
    let pickSong = document.querySelectorAll('.js-pickSong');

    //  timer and slider

    let slider = document.querySelector('.js-slider');
    let totalDuration = document.querySelector('.js-duration')
    let timer = document.querySelector('.js-timer');
    let interval = setInterval(seekUpdate, 1000);

    //  controls section variables

    let playPauseBtn = document.querySelector('.js-playpause-track');
    let previousTrackBtn = document.querySelector('.js-previous-track');
    let nextTrackBtn = document.querySelector('.js-next-track');

    //  functions variables

    let isPlaying = false;
    let trackIndex = 0;

    let currentTrack = document.createElement('audio');

    //  slider and timer functionality

    function seekUpdate() {
      
      let seekPosition = 0;

      if (!isNaN(currentTrack.duration)) {

        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);

        slider.value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);

        if (currentSeconds < 10 ) {
          currentSeconds = '0' + currentSeconds;
        }

        if (currentMinutes < 10 ) {
          currentMinutes = '0' + currentMinutes;
        }

        timer.textContent = currentMinutes + ':' + currentSeconds;
      }
    }

    document.querySelector('.js-slider').addEventListener('input', function (e) {
      let sliderValue = e.target.value;
      currentTrack.currentTime = sliderValue * currentTrack.duration / 100;
    });

    //  player track list

    let trackList = [
      {
        artist: "Rav G",
        name: "track01",
        path: "media/track01.mp3",
        time: "02:10"
      },

      {
        artist: "Rav G",
        name: "untitled",
        path: "media/untitled.mp3",
        time: "00:53"
      },

      {
        artist: "Rav G",
        name: "Messi final",
        path: "media/Messi final.mp3",
        time: "03:42"
      },

      {
        artist: "Rav G",
        name: "rozpierdol",
        path: "media/rozpierdol.mp3",
        time: "03:12"
      }
    ]

    //  function used to display track list in dropdown menu

    let id = 1;

    for (let i = 0; i < trackList.length; i++) {
       document.querySelector('.js-track-list' + id).innerHTML = `${id}. ${trackList[i].artist} &nbsp-&nbsp ${trackList[i].name}`;
       id++;
    }

    //  function used to load tracks

    function loadTrack(trackIndex) {

      //  loading current track by checking its index in array

      currentTrack.src = trackList[trackIndex].path;
      currentTrack.load();

      //  displaying artist and song name by cheking its index in array

      artistName.innerHTML = trackList[trackIndex].artist; 
      songName.innerHTML = trackList[trackIndex].name;
      totalDuration.innerHTML = trackList[trackIndex].time;

      //  listening if track ended and playing next if it did

      currentTrack.addEventListener("ended", nextTrack);
    }

    //  calling function above to pass index from array and execute it

    loadTrack(trackIndex);
    
    //  function used to play and pause current track

    function playPauseTrack() {

      if (!isPlaying) playTrack();
      else pauseTrack();
    }
    
    //  function used to play track and switch button icon

    function playTrack() {

      currentTrack.play();
      isPlaying = true;

      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause fa-2xl"></i>';
    }

    //  function used to pause track and switch button icon

    function pauseTrack() {

      currentTrack.pause();
      isPlaying = false;

      playPauseBtn.innerHTML = '<i class="fa-solid fa-play fa-2xl">';
    }

    //  function used to play next track

    function nextTrack() {

      if (trackIndex < trackList.length - 1)
      trackIndex++;
      else trackIndex = 0;

      loadTrack(trackIndex);
      playTrack();
    }

    //  function used to play previous track

    function previousTrack() {

      if (trackIndex > 0)
      trackIndex--;
      else trackIndex = trackList.length - 1;

      loadTrack(trackIndex);
      playTrack();
    }

    //  function used to play track by clicking on it

    pickSong.forEach(function (element, trackIndex) {
      element.addEventListener('click', function () { 
        loadTrack(trackIndex);
        playTrack();
      })
    })
