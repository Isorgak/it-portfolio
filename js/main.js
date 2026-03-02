/**
 * Isak Teklehaimanot Portfolio - Main JavaScript
 * Pure vanilla JavaScript - No frameworks
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let lastScrollY = window.scrollY;

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navMenu.style.cssText = `
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(10, 10, 10, 0.98);
                    padding: 1rem;
                    border-bottom: 1px solid var(--border);
                `;
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navMenu.style.display = 'none';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
                navMenu.style.display = 'none';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PARTICLE ANIMATION (Hero Section)
    // ============================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let frameCount = 0;

        // Check for touch device
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const particleCount = isTouchDevice ? 30 : 60;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                    color: Math.random() > 0.5 ? 'rgba(201, 169, 98, 0.5)' : 'rgba(255, 255, 255, 0.3)'
                });
            }
        }

        function animateParticles() {
            frameCount++;

            // Render every 2nd frame for performance
            if (frameCount % 2 === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.forEach((particle, i) => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();

                    // Draw connections (limited for performance)
                    if (!isTouchDevice && i % 3 === 0) {
                        particles.slice(i + 1, i + 8).forEach(other => {
                            const dx = particle.x - other.x;
                            const dy = particle.y - other.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < 120) {
                                ctx.beginPath();
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(other.x, other.y);
                                ctx.strokeStyle = `rgba(201, 169, 98, ${0.1 * (1 - distance / 120)})`;
                                ctx.stroke();
                            }
                        });
                    }
                });
            }

            animationId = requestAnimationFrame(animateParticles);
        }

        // Initialize
        resizeCanvas();
        createParticles();
        animateParticles();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        // Pause when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animateParticles();
            }
        });
    }

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                const duration = 2000;
                const steps = 60;
                const increment = countTo / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= countTo) {
                        target.textContent = countTo;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, duration / steps);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ============================================
    // SKILLS PROGRESS BAR ANIMATION
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formSuccess.classList.add('show');
                    contactForm.reset();

                    setTimeout(() => {
                        formSuccess.classList.remove('show');
                    }, 5000);
                } else {
                    alert("Something went wrong. Please try again.");
                }

            } catch (error) {
                alert("Network error. Please try again.");
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }


    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // FOOTER YEAR
    // ============================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // TIMELINE CARD INTERACTIONS
    // ============================================
    const timelineCards = document.querySelectorAll('.timeline-card');

    timelineCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // SKILL CARD INTERACTIONS
    // ============================================
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // EDUCATION CARD INTERACTIONS
    // ============================================
    const educationCards = document.querySelectorAll('.education-card');

    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-3px)';
        });
    });

    // ============================================
    // INFO CARD INTERACTIONS
    // ============================================
    const infoCards = document.querySelectorAll('.info-card');

    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio initialized successfully!');
});
