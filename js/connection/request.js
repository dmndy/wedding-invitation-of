import { formatRsvpPayload, parseCommentResponse } from './dto.js';
import { getCache, setCache } from './cache.js';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuappGvk-IprCbqUgjIB8dK5woVrAa7OAAfs6057m177yXYJCnZcWrpe7KzpVxHhM2sQ/exec";

export async function fetchCommentsRequest(useCache = false) {
    if (useCache) {
        const cached = getCache('comments');
        if (cached) return cached;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const json = await response.json();
        const parsed = parseCommentResponse(json);
        setCache('comments', parsed, 60); 
        return parsed;
    } catch (error) {
        console.error('API Error (Fetch Comments):', error);
        return [];
    }
}

export async function sendRsvpRequest(nama, kehadiran, ucapan) {
    const payload = formatRsvpPayload(nama, kehadiran, ucapan);
    
    const formData = new URLSearchParams();
    formData.append('nama', payload.nama);
    formData.append('kehadiran', payload.kehadiran);
    formData.append('ucapan', payload.ucapan);

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });
        return { success: true };
    } catch (error) {
        console.error('API Error (Send RSVP):', error);
        throw error;
    }
}