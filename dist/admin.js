<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Kelola Undangan</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-stone-100 p-6 font-sans text-stone-800">
    <div class="max-w-6xl mx-auto space-y-6">
        
        <div class="flex justify-between items-center border-b pb-4">
            <h1 class="text-2xl font-bold text-stone-800">Dashboard Pengantin</h1>
            <a href="index.html" target="_blank" class="text-xs bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700">
                <i class="fa-solid fa-eye mr-1"></i> Lihat Undangan
            </a>
        </div>

        <!-- Ringkasan Statistik -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
                <span class="text-xs text-stone-500 uppercase font-semibold">Total Tamu Diundang</span>
                <p id="stat-total-tamu" class="text-3xl font-bold text-stone-800 mt-2">0</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
                <span class="text-xs text-stone-500 uppercase font-semibold">Konfirmasi Hadir</span>
                <p id="stat-total-hadir" class="text-3xl font-bold text-emerald-600 mt-2">0</p>
            </div>
            <div class="bg-white p-5 rounded-xl shadow-sm border border-stone-200">
                <span class="text-xs text-stone-500 uppercase font-semibold">Tidak Hadir</span>
                <p id="stat-total-absent" class="text-3xl font-bold text-rose-600 mt-2">0</p>
            </div>
        </div>

        <!-- Form Tambah Tamu -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
            <h2 class="text-base font-bold text-stone-800">Tambah Tamu Undangan Baru</h2>
            <form id="addGuestForm" class="flex flex-col md:flex-row gap-4">
                <input type="text" id="adminNamaTamu" placeholder="Nama Tamu / Keluarga" required class="p-2.5 border rounded-lg w-full md:w-1/2 text-sm focus:outline-none focus:border-stone-800">
                <select id="adminKategoriTamu" class="p-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:border-stone-800">
                    <option value="VIP">VIP</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Teman">Teman</option>
                </select>
                <button type="submit" class="bg-rose-900 text-white px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase font-semibold hover:bg-rose-950 transition">
                    <i class="fa-solid fa-plus mr-1"></i> Tambah Tamu
                </button>
            </form>
        </div>

        <!-- Tabel Daftar Tamu -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
            <h2 class="text-base font-bold text-stone-800">Daftar Tamu & Generator Link WA</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b bg-stone-50 text-xs text-stone-500 uppercase">
                            <th class="p-3">#</th>
                            <th class="p-3">Nama</th>
                            <th class="p-3">Kategori</th>
                            <th class="p-3">Aksi WhatsApp</th>
                            <th class="p-3">Kelola</th>
                        </tr>
                    </thead>
                    <tbody id="guestTableBody"></tbody>
                </table>
            </div>
        </div>

        <!-- Tabel Rekap RSVP -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
            <h2 class="text-base font-bold text-stone-800">Rekap Konfirmasi Kehadiran & Ucapan (RSVP)</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b bg-stone-50 text-xs text-stone-500 uppercase">
                            <th class="p-3">#</th>
                            <th class="p-3">Nama Tamu</th>
                            <th class="p-3">Kehadiran</th>
                            <th class="p-3">Ucapan / Doa</th>
                            <th class="p-3">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody id="rsvpTableBody"></tbody>
                </table>
            </div>
        </div>

    </div>

    <!-- Script Admin langsung -->
    <script>
        const BASE_URL = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
        const defaultGuests = [{ id: 1, nama: 'Budi Santoso', kategori: 'VIP' }];

        document.addEventListener('DOMContentLoaded', () => {
            renderDashboardStats();
            renderGuestListTable();
            renderRSVPTable();
            initAddGuestForm();
        });

        function getGuestList() {
            return JSON.parse(localStorage.getItem('wedding_guests')) || defaultGuests;
        }

        function getRSVPList() {
            return JSON.parse(localStorage.getItem('wedding_rsvp')) || [];
        }

        function renderDashboardStats() {
            const guests = getGuestList();
            const rsvps = getRSVPList();

            document.getElementById('stat-total-tamu').innerText = guests.length;
            document.getElementById('stat-total-hadir').innerText = rsvps.filter(r => r.kehadiran === 'Hadir').length;
            document.getElementById('stat-total-absent').innerText = rsvps.filter(r => r.kehadiran === 'Tidak Hadir').length;
        }

        function renderGuestListTable() {
            const tableBody = document.getElementById('guestTableBody');
            if (!tableBody) return;

            const guests = getGuestList();
            tableBody.innerHTML = '';

            guests.forEach((guest, index) => {
                const guestLink = `${BASE_URL}?to=${encodeURIComponent(guest.nama)}`;
                const waText = `Halo ${guest.nama}, kami mengundang Anda untuk hadir di pernikahan kami. Buka tautan undangan digital Anda di sini:\n\n${guestLink}`;
                const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

                const tr = document.createElement('tr');
                tr.className = 'border-b border-stone-200 text-sm';
                tr.innerHTML = `
                    <td class="p-3 text-stone-500">${index + 1}</td>
                    <td class="p-3 font-semibold text-stone-800">${guest.nama}</td>
                    <td class="p-3 text-stone-600">${guest.kategori || '-'}</td>
                    <td class="p-3 space-x-2">
                        <button onclick="copyToClipboard('${guestLink}')" class="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs rounded-md transition">
                            <i class="fa-solid fa-copy mr-1"></i> Salin Link
                        </button>
                        <a href="${waUrl}" target="_blank" class="inline-block px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-md transition">
                            <i class="fa-brands fa-whatsapp mr-1"></i> Kirim WA
                        </a>
                    </td>
                    <td class="p-3">
                        <button onclick="deleteGuest(${guest.id})" class="text-rose-600 hover:text-rose-800 text-xs">
                            <i class="fa-solid fa-trash"></i> Hapus
                        </button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }

        function initAddGuestForm() {
            const addForm = document.getElementById('addGuestForm');
            if (!addForm) return;

            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const namaInput = document.getElementById('adminNamaTamu');
                const kategoriInput = document.getElementById('adminKategoriTamu');

                const guests = getGuestList();
                guests.push({
                    id: Date.now(),
                    nama: namaInput.value.trim(),
                    kategori: kategoriInput.value
                });

                localStorage.setItem('wedding_guests', JSON.stringify(guests));
                namaInput.value = '';
                renderGuestListTable();
                renderDashboardStats();
            });
        }

        function deleteGuest(id) {
            if (!confirm('Apakah Anda yakin ingin menghapus nama tamu ini?')) return;
            let guests = getGuestList().filter(g => g.id !== id);
            localStorage.setItem('wedding_guests', JSON.stringify(guests));
            renderGuestListTable();
            renderDashboardStats();
        }

        function renderRSVPTable() {
            const tableBody = document.getElementById('rsvpTableBody');
            if (!tableBody) return;

            const rsvps = getRSVPList();
            tableBody.innerHTML = '';

            rsvps.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-stone-200 text-sm';
                tr.innerHTML = `
                    <td class="p-3 text-stone-500">${index + 1}</td>
                    <td class="p-3 font-semibold text-stone-800">${item.nama}</td>
                    <td class="p-3 font-medium ${item.kehadiran === 'Hadir' ? 'text-emerald-600' : 'text-rose-600'}">${item.kehadiran}</td>
                    <td class="p-3 text-stone-600">${item.ucapan}</td>
                    <td class="p-3 text-xs text-stone-400">${item.waktu || '-'}</td>
                `;
                tableBody.appendChild(tr);
            });
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Tautan khusus tamu berhasil disalin!');
            });
        }
    </script>
</body>
</html>