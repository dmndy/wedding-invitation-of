export function initOfflineHandler() {
    function updateOnlineStatus() {
        const isOnline = navigator.onLine;
        const disabledElements = document.querySelectorAll('[data-offline-disabled="true"]');
        
        disabledElements.forEach(el => {
            el.disabled = !isOnline;
        });

        if (!isOnline) {
            console.warn('Perangkat sedang offline. Fitur jaringan dinonaktifkan sementara.');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
}