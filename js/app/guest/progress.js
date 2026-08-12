export function initProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 10;
                progressBar.style.width = width + '%';
            }
        }, 50);
    }
}