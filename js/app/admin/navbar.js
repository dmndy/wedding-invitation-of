export function initNavbar() {
    const navLinks = document.querySelectorAll('#navbar-menu a');
    
    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 100;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            if (section) {
                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initNavbar);