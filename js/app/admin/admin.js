import { fetchComments, deleteComment } from './components/comment.js';
import { checkAuth, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) return;

    await loadDashboardData();

    const logoutBtn = document.getElementById('button-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

export async function loadDashboardData() {
    const comments = await fetchComments();
    const tableBody = document.getElementById('admin-comments-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    comments.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td><span class="badge ${item.kehadiran && item.kehadiran.includes('Hadir') ? 'bg-success' : 'bg-danger'}">${item.kehadiran}</span></td>
            <td>${item.ucapan}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="window.removeComment('${item.id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

window.removeComment = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus ucapan ini?')) {
        await deleteComment(id);
        await loadDashboardData();
    }
};