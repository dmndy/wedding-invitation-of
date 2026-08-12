export function initImageModal() {
    window.openModalImage = function (src) {
        const modalImg = document.getElementById('show-modal-image');
        const modalElement = document.getElementById('modal-image');
        if (modalImg && modalElement) {
            modalImg.src = src;
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    };
}