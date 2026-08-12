export function initLanguage() {
    let currentLang = localStorage.getItem('app_language') || 'id';
    setLanguage(currentLang);
}

export function setLanguage(lang) {
    if (!['id', 'en', 'ko'].includes(lang)) lang = 'id';
    localStorage.setItem('app_language', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang-' + lang + ']').forEach((el) => {
        const text = el.getAttribute('data-lang-' + lang);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });
}

window.setLanguage = setLanguage;