export function initAudio() {
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');

    if (!audio) return;

    window.toggleAudio = function () {
        if (audio.paused) {
            audio.play();
            if (musicIcon) musicIcon.className = 'fa-solid fa-pause';
        } else {
            audio.pause();
            if (musicIcon) musicIcon.className = 'fa-solid fa-music';
        }
    };
}