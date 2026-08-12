import { initAudio } from './audio.js';
import { initImageModal } from './image.js';
import { initProgress } from './progress.js';
import { renderComments, sendComment } from '../components/comment.js';

document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initImageModal();
    initProgress();
    renderComments();

    const rsvpForm = document.getElementById('rsvpForm') || document.getElementById('comment-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            const nama = document.getElementById('nama')?.value || document.getElementById('form-name')?.value;
            const kehadiran = document.getElementById('kehadiran')?.value || document.getElementById('form-presence')?.value || 'Hadir';
            const ucapan = document.getElementById('ucapan')?.value || document.getElementById('form-comment')?.value;

            await sendComment(nama, kehadiran, ucapan);

            alert('Terima kasih! Ucapan Anda telah dikirim.');
            rsvpForm.reset();
            if (submitBtn) submitBtn.disabled = false;
        });
    }
});