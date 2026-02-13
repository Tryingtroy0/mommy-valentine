document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const heartBtn = document.getElementById('heart-btn');
    const messageOverlay = document.getElementById('message-overlay');
    const closeBtn = document.getElementById('close-btn');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const backgroundHeartsContainer = document.getElementById('background-hearts');

    // State
    let isMusicPlaying = false;

    // Functions
    function createBackgroundHearts() {
        const heartSymbols = ['❤', '💖', '💕', '💗', '💓'];
        const heartCount = 30; // Number of floating hearts

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            // Random positioning and animation properties
            const left = Math.random() * 100;
            const animationDuration = 5 + Math.random() * 10; // 5-15 seconds
            const animationDelay = Math.random() * 5;
            const fontSize = 1 + Math.random() * 2; // 1-3rem

            heart.style.left = `${left}%`;
            heart.style.animationDuration = `${animationDuration}s`;
            heart.style.animationDelay = `-${animationDelay}s`; // Start immediately with offset
            heart.style.fontSize = `${fontSize}rem`;

            backgroundHeartsContainer.appendChild(heart);
        }
    }

    function openOverlay() {
        messageOverlay.classList.add('active');
        playMusic();
    }

    function closeOverlay() {
        messageOverlay.classList.remove('active');
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '🎵 Play Music';
            isMusicPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicBtn.textContent = '⏸ Pause Music';
                isMusicPlaying = true;
            }).catch(e => {
                console.log("Audio play failed (user interaction needed first): ", e);
            });
        }
    }

    function playMusic() {
        // Try to play music automatically when heart is clicked
        if (!isMusicPlaying) {
            bgMusic.play().then(() => {
                musicBtn.textContent = '⏸ Pause Music';
                isMusicPlaying = true;
            }).catch(e => {
                console.log("Audio play failed: ", e);
            });
        }
    }

    // Event Listeners
    heartBtn.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);
    
    // Close overlay if clicking outside content
    messageOverlay.addEventListener('click', (e) => {
        if (e.target === messageOverlay) {
            closeOverlay();
        }
    });

    musicBtn.addEventListener('click', toggleMusic);

    // Initialize
    createBackgroundHearts();
});
