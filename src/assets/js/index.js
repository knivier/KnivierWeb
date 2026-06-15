// Global error handling
window.addEventListener('error', (e) => {
    console.warn('Portfolio error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
});

// Particle.js Configuration with error handling
try {
    particlesJS('particles-js', {
        particles: {
            number: {value: 140, density: {enable: true, value_area: 900}},
            color: {value: ['#6366F1', '#F59E0B', '#8B5CF6']},
            shape: {type: 'circle'},
            opacity: {value: 0.6, random: true, anim: {enable: true, speed: 1, opacity_min: 0.1}},
            size: {value: 3, random: true, anim: {enable: true, speed: 2, size_min: 0.3}},
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366F1',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {enable: true, mode: 'grab'},
                onclick: {enable: true, mode: 'push'},
                resize: true
            },
            modes: {
                grab: {distance: 200, line_linked: {opacity: 0.8}},
                push: {particles_nb: 4}
            }
        },
        retina_detect: true
    });
} catch (error) {
    console.warn('Particles.js failed to load:', error);
    // Fallback: hide particles container
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        particlesContainer.style.display = 'none';
    }
}

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animations for stats
            if (entry.target.querySelector('.counter')) {
                animateCounters(entry.target);
            }
            
            // Trigger stagger animations
            if (entry.target.querySelector('.stagger-animation')) {
                triggerStaggerAnimation(entry.target);
            }
        }
    });
}, observerOptions);

// Counter Animation Function
function animateCounters(container) {
    const counters = container.querySelectorAll('.counter');
    counters.forEach(counter => {
        // Check if counter has already been animated
        if (counter.dataset.animated === 'true') {
            return;
        }
        
        // Mark as animated to prevent re-animation
        counter.dataset.animated = 'true';
        
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        setTimeout(updateCounter, Math.random() * 500);
    });
}

// Stagger Animation Trigger
function triggerStaggerAnimation(container) {
    const elements = container.querySelectorAll('.stagger-animation > *');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize section observers
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('fade-in-up')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
    }
    observer.observe(section);
});

// Enhanced 3D Card Effect
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Add subtle glow effect
        const intensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 20) / 20;
        card.style.boxShadow = `0 ${10 + intensity * 20}px ${30 + intensity * 20}px rgba(99, 102, 241, ${0.1 + intensity * 0.2})`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = '';
    });
});

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!typingElement || window.innerWidth <= 768 || prefersReducedMotion) {
        return;
    }

    const fullText = typingElement.textContent.trim() || 'Knivier';
    const msPerChar = 72;

    typingElement.textContent = '';
    typingElement.classList.add('typing-animate');

    let charIndex = 0;
    let lastStep = performance.now();

    function step(now) {
        if (now - lastStep >= msPerChar) {
            if (charIndex < fullText.length) {
                typingElement.textContent += fullText[charIndex++];
                lastStep = now;
            }
        }

        if (charIndex < fullText.length) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function initDynamicIsland() {
    const island = document.getElementById('dynamic-island');
    if (!island) return;

    const track = island.querySelector('.dynamic-island__track');
    const indicator = island.querySelector('.dynamic-island__indicator');
    const items = [...island.querySelectorAll('.dynamic-island__item')];
    if (!track || !indicator || !items.length) return;

    let activeItem = island.querySelector('.dynamic-island__item.is-active') || items[0];
    let userNavLock = false;
    let scrollSettleTimer = null;

    function moveIndicator(item) {
        if (!item) return;
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.height = `${item.offsetHeight}px`;
        indicator.style.transform = `translate(${item.offsetLeft}px, ${item.offsetTop}px)`;
    }

    function setActive(item, fromSpy = false) {
        if (!item) return;
        if (fromSpy && userNavLock) return;
        items.forEach((el) => {
            el.classList.remove('is-active');
            el.removeAttribute('aria-current');
        });
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');
        activeItem = item;
        moveIndicator(item);
    }

    function lockSpyDuringScroll() {
        userNavLock = true;
        clearTimeout(scrollSettleTimer);
    }

    function scheduleSpyUnlock() {
        clearTimeout(scrollSettleTimer);
        scrollSettleTimer = setTimeout(() => {
            userNavLock = false;
        }, 180);
    }

    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (!href?.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (!target) return;
            lockSpyDuringScroll();
            setActive(item);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            item.blur();
        });
    });

    window.addEventListener('scroll', () => {
        if (userNavLock) scheduleSpyUnlock();
    }, { passive: true });

    const sections = items
        .map((item) => document.getElementById(item.dataset.section))
        .filter(Boolean);

    if (sections.length) {
        const spyObserver = new IntersectionObserver(
            (entries) => {
                if (userNavLock) return;
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (!visible.length) return;
                const matchingItem = items.find(
                    (item) => item.dataset.section === visible[0].target.id
                );
                if (matchingItem) setActive(matchingItem, true);
            },
            { rootMargin: '-35% 0px -40% 0px', threshold: [0, 0.2, 0.4, 0.6] }
        );
        sections.forEach((section) => spyObserver.observe(section));
    }

    requestAnimationFrame(() => {
        moveIndicator(activeItem);
        requestAnimationFrame(() => moveIndicator(activeItem));
    });
    window.addEventListener('resize', () => moveIndicator(activeItem));
}

// Enhanced DOM Ready Functions
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const banner = document.getElementById('pre-production-banner');
        const closeBtn = document.getElementById('close-banner');

        if (banner && closeBtn) {
            // Enhanced banner close with smooth animation and accessibility
            closeBtn.addEventListener('click', function () {
                banner.classList.add('hidden');
                banner.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    banner.style.display = 'none';
                }, 400);
            });

            // Keyboard support for banner close
            closeBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeBtn.click();
                }
            });
        }

        // Smart banner hide/show on scroll with performance optimization
        let lastScrollTop = 0;
        let scrollTimeout;
        let ticking = false;
        
        function updateBannerOnScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDifference = Math.abs(scrollTop - lastScrollTop);
            
            if (scrollDifference > 10 && banner) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    banner.style.transform = 'translateY(-100%)';
                } else {
                    banner.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateBannerOnScroll);
                ticking = true;
            }
        });

        // Enhanced smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]:not(.dynamic-island__item)').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    // Add focus for keyboard users
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Remove tabindex after focus
                    setTimeout(() => {
                        target.removeAttribute('tabindex');
                    }, 1000);
                }
            });
        });

        // Enhanced hover effects with performance optimization
        const interactiveElements = document.querySelectorAll('.glass, .project-card, .stat-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        initTypingAnimation();
        initDynamicIsland();

        // Comprehensive accessibility and performance optimization
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotion(mediaQuery) {
            if (mediaQuery.matches) {
                document.documentElement.style.setProperty('--transition-fast', '0.001s');
                document.documentElement.style.setProperty('--transition-normal', '0.001s');
                document.documentElement.style.setProperty('--transition-slow', '0.001s');
                
                // Disable particle animations
                const particlesContainer = document.getElementById('particles-js');
                if (particlesContainer) {
                    particlesContainer.style.display = 'none';
                }
            }
        }
        
        prefersReducedMotion.addListener(handleReducedMotion);
        handleReducedMotion(prefersReducedMotion);

    } catch (error) {
        console.warn('Error during DOM initialization:', error);
    }
});