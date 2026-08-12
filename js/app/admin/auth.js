const ADMIN_SESSION_KEY = 'jihoon_intania_admin_session';

export function login(username, password) {
    if (username === 'admin' && password === 'jihoonintania2026') {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        window.location.href = 'admin.html';
        return true;
    }
    alert('Username atau password salah!');
    return false;
}

export function checkAuth() {
    const isAuth = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!isAuth && !window.location.pathname.endsWith('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

export function logout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = 'login.html';
}