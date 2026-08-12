export function initBootstrapComponents() {
    // Inisialisasi Tooltips jika ada
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        if (window.bootstrap && window.bootstrap.Tooltip) {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        }
    });

    // Inisialisasi Popovers jika ada
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(popoverTriggerEl => {
        if (window.bootstrap && window.bootstrap.Popover) {
            new window.bootstrap.Popover(popoverTriggerEl);
        }
    });
}

export function showModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        modal.show();
    }
}

export function hideModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }
}