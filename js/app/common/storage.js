export function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error menyimpan ke LocalStorage:', e);
    }
}

export function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Error membaca dari LocalStorage:', e);
        return defaultValue;
    }
}

export function removeStorage(key) {
    localStorage.removeItem(key);
}