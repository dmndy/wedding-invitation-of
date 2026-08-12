const CACHE_PREFIX = 'api_cache_';

export function setCache(key, data, ttlInSeconds = 300) {
    const expiry = Date.now() + (ttlInSeconds * 1000);
    const payload = { data, expiry };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
}

export function getCache(key) {
    const itemStr = localStorage.getItem(CACHE_PREFIX + key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        return item.data;
    } catch (e) {
        return null;
    }
}

export function clearCache(key) {
    localStorage.removeItem(CACHE_PREFIX + key);
}