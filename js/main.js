// ZestoraX Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling - let Formspree handle it
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem. Please email us directly at support@zestorax.com');
                }
            } catch (error) {
                alert('Oops! There was a problem. Please email us directly at support@zestorax.com');
            }

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }

    // Enhanced scroll animations with staggered delays
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.feature-card, .product-card, .value-card, .stat-item, .stat-card, ' +
        '.problem-card, .pricing-card, .testimonial-card, .audience-card, ' +
        '.feature-showcase-item, .step-card, .trust-badge, .faq-item'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Add staggered delay for items in grids
        const parent = el.parentElement;
        if (parent) {
            const siblings = Array.from(parent.children).filter(child =>
                child.matches('.feature-card, .problem-card, .pricing-card, .testimonial-card, .audience-card, .step-card, .trust-badge, .stat-card, .value-card')
            );
            const siblingIndex = siblings.indexOf(el);
            if (siblingIndex > -1) {
                el.dataset.delay = siblingIndex * 100;
            }
        }

        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // Solution demo animation
    const solutionDemo = document.querySelector('.solution-demo');
    if (solutionDemo) {
        const demoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the demo cards
                    const demoBefore = entry.target.querySelector('.demo-before');
                    const demoArrow = entry.target.querySelector('.demo-arrow');
                    const demoAfter = entry.target.querySelector('.demo-after');

                    if (demoBefore) {
                        demoBefore.style.opacity = '0';
                        demoBefore.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            demoBefore.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            demoBefore.style.opacity = '1';
                            demoBefore.style.transform = 'translateX(0)';
                        }, 100);
                    }

                    if (demoArrow) {
                        demoArrow.style.opacity = '0';
                        setTimeout(() => {
                            demoArrow.style.transition = 'opacity 0.6s ease';
                            demoArrow.style.opacity = '1';
                        }, 400);
                    }

                    if (demoAfter) {
                        demoAfter.style.opacity = '0';
                        demoAfter.style.transform = 'translateX(20px)';
                        setTimeout(() => {
                            demoAfter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            demoAfter.style.opacity = '1';
                            demoAfter.style.transform = 'translateX(0)';
                        }, 600);
                    }

                    demoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        demoObserver.observe(solutionDemo);
    }

    // Pricing card hover effect for popular badge
    const popularCard = document.querySelector('.pricing-card.popular');
    if (popularCard) {
        popularCard.addEventListener('mouseenter', () => {
            popularCard.style.boxShadow = '0 25px 50px -12px rgba(99, 102, 241, 0.25)';
        });
        popularCard.addEventListener('mouseleave', () => {
            popularCard.style.boxShadow = '';
        });
    }

    // Lazy load images (for when real screenshots are added)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe stat cards for counter animation
    const statValues = document.querySelectorAll('.stat-card .stat-value, .stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                // Only animate if it's a pure number
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number && !text.includes('$') && !text.includes('%') && !text.includes('+')) {
                    entry.target.textContent = '0';
                    setTimeout(() => {
                        animateCounter(entry.target, number, 1500);
                    }, 200);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => statsObserver.observe(stat));
});

// Utility function for smooth page transitions
function navigateTo(url) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Track outbound links (for analytics if needed later)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[target="_blank"]');
    if (link) {
        // Could add analytics tracking here
        console.log('Outbound link clicked:', link.href);
    }
});
