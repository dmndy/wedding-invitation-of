document.addEventListener('DOMContentLoaded', () => {
    initGuestGreeting();
    initCountdown();
    initRSVPForm();
    renderUcapanList();
});

// 1. Membaca Nama Tamu dari Parameter URL (?to=Nama+Tamu)
function initGuestGreeting() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('guest');
    const guestElement = document.getElementById('guest-name');
    const inputNamaForm = document.getElementById('nama');

    if (guestName) {
        const decodedName = decodeURIComponent(guestName);
        if (guestElement) guestElement.innerText = decodedName;
        if (inputNamaForm) inputNamaForm.value = decodedName;
    }
}

// 2. Countdown Timer Acara Pernikahan
function initCountdown() {
    const targetDate = new Date("Dec 25, 2026 08:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl) return;

        if (difference < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = "<p class='col-span-4 text-rose-200 font-bold'>Acara Telah Selesai</p>";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
}

// 3. Menangani Pengiriman Form RSVP
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    if (!rsvpForm) return;

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const kehadiran = document.getElementById('kehadiran').value;
        const ucapan = document.getElementById('ucapan').value.trim();

        if (!nama || !kehadiran || !ucapan) {
            alert('Mohon isi semua kolom!');
            return;
        }

        const newUcapan = {
            id: Date.now(),
            nama: nama,
            kehadiran: kehadiran,
            ucapan: ucapan,
            waktu: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        };

        const existingData = JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
        existingData.unshift(newUcapan);
        localStorage.setItem('wedding_rsvp', JSON.stringify(existingData));

        renderUcapanList();
        rsvpForm.reset();
        alert('Terima kasih! Ucapan dan konfirmasi Anda telah tersimpan.');
    });
}

// 4. Menampilkan Daftar Ucapan
function renderUcapanList() {
    const ucapanListContainer = document.getElementById('ucapanList');
    if (!ucapanListContainer) return;

    const defaultData = [
        { id: 1, nama: 'Budi Santoso', kehadiran: 'Hadir', ucapan: 'Selamat Romeo & Juliet! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.', waktu: '10 Aug 2026' }
    ];

    const existingData = JSON.parse(localStorage.getItem('wedding_rsvp')) || defaultData;
    ucapanListContainer.innerHTML = '';

    existingData.forEach(item => {
        const badgeClass = item.kehadiran === 'Hadir' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-rose-100 text-rose-800';

        const itemDiv = document.createElement('div');
        itemDiv.className = 'p-4 bg-stone-50 rounded-xl border border-stone-100 shadow-sm';
        itemDiv.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="font-bold text-sm text-stone-800">${escapeHtml(item.nama)}</span>
                <span class="text-[10px] ${badgeClass} px-2 py-0.5 rounded-full font-semibold">${escapeHtml(item.kehadiran)}</span>
            </div>
            <p class="text-stone-600 text-xs mt-1 leading-relaxed">${escapeHtml(item.ucapan)}</p>
            <span class="text-[9px] text-stone-400 block mt-2">${item.waktu || ''}</span>
        `;
        ucapanListContainer.appendChild(itemDiv);
    });
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}