// player.js

let player;
let isPlaying = false;

// 1. Initialize the YouTube IFrame API
function onYouTubeIframeAPIReady() {
    // Find the player element
    const playerContainer = document.getElementById('custom-youtube-player');
    
    // Fallback check: ensure the element exists before trying to read its dataset
    if (!playerContainer) {
        console.error("Player container element not found.");
        return;
    }

    // Grab the video ID from the HTML data attribute
    const dynamicVideoId = playerContainer.dataset.videoId;

    if (!dynamicVideoId) {
        console.error("No video ID provided in data-video-id attribute.");
        return;
    }
    
    player = new YT.Player('custom-youtube-player', {
        videoId: dynamicVideoId, // Your ZBLL recognition video ID
        playerVars: {
            'controls': 0,          // Hide default UI
            'modestbranding': 1,    // Remove logo
            'rel': 0,               // Hide related videos
            'disablekb': 1,         // Disable default keyboard shortcuts
            'fs': 0,                // Disable fullscreen button
            'playsinline': 1        // Prevent auto-fullscreen on iOS
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 2. Setup buttons when the player is ready
function onPlayerReady(event) {
    const playPauseBtn = document.getElementById('btn-play-pause');
    const rewindBtn = document.getElementById('btn-rewind');
    const completeBtn = document.getElementById('btn-complete');

    // Play / Pause Toggle
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    // Rewind 10 Seconds (Perfect for re-watching fast fingertricks)
    rewindBtn.addEventListener('click', () => {
        const currentTime = player.getCurrentTime();
        player.seekTo(Math.max(0, currentTime - 10), true);
    });

    // Handle "Complete & Next" Click
    completeBtn.addEventListener('click', (e) => {
        if (completeBtn.classList.contains('opacity-50')) {
            e.preventDefault();
            alert('Please finish watching the lesson before moving on!');
        } else {
            // Logic to navigate to Lesson 1.3 goes here
            console.log('Navigating to the next lesson...');
        }
    });
}

// 3. Track video state to update UI
function onPlayerStateChange(event) {
    const playPauseBtn = document.getElementById('btn-play-pause');
    const completeBtn = document.getElementById('btn-complete');

    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playPauseBtn.innerText = '⏸ Pause';
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        playPauseBtn.innerText = '▶ Play';
    } else if (event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        playPauseBtn.innerText = '↺ Replay';
        
        // Unlock the "Complete & Next" button
        completeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        completeBtn.classList.add('hover:bg-blue-500', 'shadow-lg', 'shadow-blue-600/20');
    }
}