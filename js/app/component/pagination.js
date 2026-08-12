export function setupPagination(items, itemsPerPage, renderCallback) {
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function getPageItems() {
        const start = (currentPage - 1) * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }

    return {
        nextPage: () => { if (currentPage < totalPages) currentPage++; renderCallback(getPageItems()); },
        prevPage: () => { if (currentPage > 1) currentPage--; renderCallback(getPageItems()); },
        getItems: getPageItems
    };
}