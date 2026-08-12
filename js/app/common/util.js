export function copyToClipboard(text, btnElement = null) {
    navigator.clipboard.writeText(text).then(() => {
        if (btnElement) {
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-check me-1"></i>Tersalin';
            setTimeout(() => {
                btnElement.innerHTML = originalText;
            }, 2000);
        } else {
            alert('Teks berhasil disalin!');
        }
    }).catch(err => {
        console.error('Gagal menyalin teks:', err);
    });
}

export function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (match) => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

window.copyToClipboard = copyToClipboard;