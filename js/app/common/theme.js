export function initTheme() {
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    setTheme(savedTheme);
}

export function setTheme(theme) {
    localStorage.setItem('app_theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
}

export function toggleTheme() {
    const currentTheme = localStorage.getItem('app_theme') === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
}

window.toggleTheme = toggleTheme;