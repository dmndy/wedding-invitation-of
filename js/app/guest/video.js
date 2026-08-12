export function initVideoPlayer() {
    const video = document.getElementById('wedding-video');
    if (video) {
        video.addEventListener('play', () => {
            const bgAudio = document.getElementById('bg-music');
            if (bgAudio && !bgAudio.paused) {
                bgAudio.pause();
            }
        });
    }
}