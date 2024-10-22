// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Archive cards expansion
    const archiveCards = document.querySelectorAll('.archive-card[data-expandable]');

    archiveCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle the expanded class
            card.classList.toggle('expanded');

            // Find the content section within this card
            const content = card.querySelector('.archive-content');

            // If expanded, set the max-height to the scroll height
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = `${content.scrollHeight}px`;
            } else {
                content.style.maxHeight = '0';
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });
});