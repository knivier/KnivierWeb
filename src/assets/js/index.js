// Particle.js Configuration
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

// Custom Cursor
let cursor = null;
let isHovering = false;

function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Handle clickable elements
    const clickableElements = document.querySelectorAll('a, button, .glass, .project-card, .stat-card, .timeline-item, [role="button"], input, textarea, select');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursor && !isHovering) {
                cursor.classList.add('hover');
                isHovering = true;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursor && isHovering) {
                cursor.classList.remove('hover');
                isHovering = false;
            }
        });
        
        element.addEventListener('mousedown', () => {
            if (cursor) cursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            if (cursor) cursor.classList.remove('click');
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            document.body.style.cursor = 'auto';
            if (cursor) cursor.style.display = 'none';
        } else {
            document.body.style.cursor = 'none';
            if (cursor) cursor.style.display = 'block';
        }
    });
}

// Enhanced DOM Ready Functions
document.addEventListener('DOMContentLoaded', function () {
    // Initialize custom cursor
    initCustomCursor();
    const banner = document.getElementById('pre-production-banner');
    const closeBtn = document.getElementById('close-banner');

    // Enhanced banner close with smooth animation
    closeBtn.addEventListener('click', function () {
        banner.classList.add('hidden');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);
    });

    // Smart banner hide/show on scroll
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDifference = Math.abs(scrollTop - lastScrollTop);
            
            if (scrollDifference > 10) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    banner.style.transform = 'translateY(-100%)';
                } else {
                    banner.style.transform = 'translateY(0)';
                }
                lastScrollTop = scrollTop;
            }
        }, 10);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover sound effect (optional - requires audio files)
    document.querySelectorAll('.glass, .project-card, .stat-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Initialize typing animation after a delay
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement && window.innerWidth > 768) {
            typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }
    }, 500);

    // Performance optimization for animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(element => {
            element.style.animationDuration = '0.001s';
            element.style.transitionDuration = '0.001s';
        });
    }
});