export function formatRsvpPayload(nama, kehadiran, ucapan) {
    return {
        nama: nama ? nama.trim() : '',
        kehadiran: kehadiran ? kehadiran.trim() : '-',
        ucapan: ucapan ? ucapan.trim() : ''
    };
}

export function parseCommentResponse(rawList) {
    if (!Array.isArray(rawList)) return [];
    
    return rawList.map(item => ({
        nama: item.nama || 'Tamu',
        kehadiran: item.kehadiran || '-',
        ucapan: item.ucapan || ''
    }));
}