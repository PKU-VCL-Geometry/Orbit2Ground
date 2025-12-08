
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('comparison-container');
    const videoOurs = document.getElementById('video-ours');
    const videoBaseline = document.getElementById('video-baseline');
    const clipper = document.getElementById('video-clipper');
    const slider = document.getElementById('video-slider');
    const loading = document.getElementById('video-loading');
    
    if (!container || !videoOurs || !videoBaseline || !clipper || !slider) return;

    let isResetting = false;

    // Sync videos using a strict loop to ensure frame-perfect synchronization
    function syncLoop() {
        // If elements are missing or removed, stop
        if (!videoOurs || !videoBaseline) return;

        // Check if baseline is ready enough to play
        // readyState 3 is HAVE_FUTURE_DATA, 4 is HAVE_ENOUGH_DATA
        const baselineReady = videoBaseline.readyState >= 3;
        const oursReady = videoOurs.readyState >= 3;

        // Update loading state
        if (loading) {
            if (baselineReady && oursReady) {
                loading.classList.add('hidden');
            } else {
                loading.classList.remove('hidden');
            }
        }

        // If baseline is not ready, we should pause ours to wait for it
        if (!baselineReady) {
            if (!videoOurs.paused) {
                videoOurs.pause();
            }
        } else {
            // If baseline is ready, we sync it to ours
            // First ensure ours is playing
            if (videoOurs.paused) {
                videoOurs.play().catch(e => {});
            }
            // 1. Sync Play/Pause state
            // If ours is playing, baseline should play
            if (!videoOurs.paused && videoBaseline.paused) {
                videoBaseline.play().catch(e => {});
            }
            // If ours is paused, baseline should pause
            if (videoOurs.paused && !videoBaseline.paused) {
                videoBaseline.pause();
            }

            // 2. Sync Time
            // Only sync if the difference is noticeable to avoid jitter
            const diff = Math.abs(videoOurs.currentTime - videoBaseline.currentTime);
            if (diff > 0.05) {
                videoBaseline.currentTime = videoOurs.currentTime;
            }
        }

        requestAnimationFrame(syncLoop);
    }
    
    // Start the sync loop
    requestAnimationFrame(syncLoop);
    
    // Ensure the baseline video inside clipper has the correct width
    function resizeBaselineVideo() {
        const width = container.offsetWidth;
        videoBaseline.style.width = width + 'px';
    }
    
    window.addEventListener('resize', resizeBaselineVideo);
    // Also call it initially and when video loads
    videoOurs.addEventListener('loadedmetadata', resizeBaselineVideo);
    resizeBaselineVideo();

    // Slider logic
    function moveSlider(x) {
        const rect = container.getBoundingClientRect();
        let pos = x - rect.left;
        
        // Clamp
        if (pos < 0) pos = 0;
        if (pos > rect.width) pos = rect.width;
        
        const percentage = (pos / rect.width) * 100;
        
        clipper.style.width = percentage + '%';
        slider.style.left = percentage + '%';
    }

    // Mouse move on container drives slider
    container.addEventListener('mousemove', (e) => {
        moveSlider(e.clientX);
    });
    
    // Touch support
    let isDragging = false;
    slider.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            moveSlider(e.touches[0].clientX);
        }
    });
    
    // Click on container to move slider (fallback)
    container.addEventListener('click', (e) => {
        moveSlider(e.clientX);
    });

    // Force loop sync
    videoOurs.loop = false;
    videoBaseline.loop = false;
    
    videoOurs.addEventListener('ended', function() {
        videoOurs.currentTime = 0;
        videoOurs.play();
    });
});

let currentMode = 'orbit2ground';
let currentBaseline = 'skyfall-gs.mp4';

function changeMode(mode, btn) {
    currentMode = mode;
    
    // Update buttons
    const buttons = btn.parentElement.querySelectorAll('.button');
    buttons.forEach(b => {
        b.classList.remove('is-selected', 'is-dark');
        b.classList.add('is-light');
    });
    btn.classList.remove('is-light');
    btn.classList.add('is-selected', 'is-dark');

    updateVideos();
}

function changeBaseline(filename, btn) {
    currentBaseline = filename;

    // Update buttons
    const buttons = btn.parentElement.querySelectorAll('.button');
    buttons.forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');

    updateVideos();
}

function updateVideos() {
    const videoBaseline = document.getElementById('video-baseline');
    const videoOurs = document.getElementById('video-ours');
    const loading = document.getElementById('video-loading');

    if (loading) loading.classList.remove('hidden');

    const basePath = `./static/videos/comparison/${currentMode}/`;
    
    videoOurs.src = basePath + 'ours.mp4';
    videoBaseline.src = basePath + currentBaseline;
    
    videoOurs.load();
    videoBaseline.load();
    
    // Reset to start
    videoOurs.currentTime = 0;
    videoOurs.play().catch(e => console.log(e));
}
