export function createCommentCard(item) {
    const card = document.createElement('div');
    card.className = 'bg-white p-3 rounded-3 border shadow-sm mb-2';
    
    const isAttending = item.kehadiran && item.kehadiran.includes('Hadir');
    const badgeClass = isAttending ? 'bg-success' : 'bg-danger';

    card.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-1">
            <strong class="text-dark" style="font-size: 0.9rem;">${item.nama || 'Tamu'}</strong>
            <span class="badge ${badgeClass}" style="font-size: 0.7rem;">${item.kehadiran || '-'}</span>
        </div>
        <p class="m-0 text-muted" style="font-size: 0.85rem;">${item.ucapan || ''}</p>
    `;
    return card;
}