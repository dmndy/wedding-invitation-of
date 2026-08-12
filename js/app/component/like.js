export function initLikeButton() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-like')) {
            let count = parseInt(e.target.getAttribute('data-count') || '0');
            count++;
            e.target.setAttribute('data-count', count);
            e.target.innerHTML = `<i class="fa-solid fa-heart text-danger"></i> ${count}`;
        }
    });
}