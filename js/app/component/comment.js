import { createCommentCard } from './card.js';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuappGvk-IprCbqUgjIB8dK5woVrAa7OAAfs6057m177yXYJCnZcWrpe7KzpVxHhM2sQ/exec";

export async function fetchComments() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        return data || [];
    } catch (err) {
        console.error('Gagal mengambil komentar:', err);
        return [];
    }
}

export async function renderComments() {
    const listContainer = document.getElementById('comments-list') || document.getElementById('ucapanList');
    if (!listContainer) return;

    listContainer.innerHTML = '<p class="text-xs text-muted text-center py-2">Memuat ucapan...</p>';
    const comments = await fetchComments();
    
    listContainer.innerHTML = '';
    if (comments.length === 0) {
        listContainer.innerHTML = '<p class="text-xs text-muted text-center py-2">Belum ada ucapan.</p>';
        return;
    }

    comments.reverse().forEach(item => {
        listContainer.appendChild(createCommentCard(item));
    });
}

export async function sendComment(nama, kehadiran, ucapan) {
    const formData = new URLSearchParams();
    formData.append('nama', nama);
    formData.append('kehadiran', kehadiran);
    formData.append('ucapan', ucapan);

    await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    });

    setTimeout(renderComments, 1500);
}