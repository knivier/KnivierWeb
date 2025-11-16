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
            number: {value: 120, density: {enable: true, value_area: 800}},
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

// Parallax Effect for Background 
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#particles-js');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

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
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

        // Initialize typing animation with better detection
        setTimeout(() => {
            const typingElement = document.querySelector('.typing-text');
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (typingElement && window.innerWidth > 768 && !prefersReducedMotion) {
                typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
            }
        }, 500);

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