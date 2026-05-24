document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // STICKY HEADER & SCROLL PROGRESS
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header Effect
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Progress Bar
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // ==========================================================================
    // MOBILE MENU NAVIGATION
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle Menu
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Lock scroll on body when menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu on clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ==========================================================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: "-10% 0px -40% 0px"
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);
    
    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealObserverOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Animasi hanya berjalan sekali
            }
        });
    }, revealObserverOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================================================
    // BACK TO TOP BUTTON
    // ==========================================================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================================================
    // TESTIMONIALS SLIDER
    // ==========================================================================
    const testimonialTrack = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;

    function goToSlide(index) {
        // Handle boundary
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        
        // Slide animation
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots UI
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Dot Clicks
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            goToSlide(index);
            resetAutoSlide(); // Pause timer on interaction
        });
    });

    // Auto Slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000); // Ganti slide setiap 5 detik
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize Auto Slide
    startAutoSlide();

    // Pause auto slide when mouse is hovering the testimonials
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    // ==========================================================================
    // GLOBAL CONTACT LINK UPDATE (PLACEHOLDER TO EASY UPDATE IN ONE PLACE)
    // ==========================================================================
    // This is optional but helps user replace their real phone number easily later.
    const realWhatsAppNumber = "6281584816342"; // Replace with your real WhatsApp number (format: 628...)
    
    // Update all WA links programmatically to point to the active WhatsApp number
    const updateAllWhatsAppLinks = () => {
        const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
        waLinks.forEach(link => {
            const currentHref = link.getAttribute('href');
            // Extract the message template if any
            const urlParts = currentHref.split('?text=');
            const msgQuery = urlParts.length > 1 ? `?text=${urlParts[1]}` : '';
            
            link.setAttribute('href', `https://wa.me/${realWhatsAppNumber}${msgQuery}`);
        });
        
        // Also update contact details phone text
        const contactPhoneEl = document.querySelector('.contact-detail-text p');
        if (contactPhoneEl && contactPhoneEl.textContent.includes('+62 815-8481-6342')) {
            contactPhoneEl.textContent = "+62 815-8481-6342";
        }
    };
    
    // Execute update
    updateAllWhatsAppLinks();

    // ==========================================================================
    // 3D PARALLAX & FLOATING CARDS EFFECT
    // ==========================================================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const floatingCards = document.querySelectorAll('.floating-card-1, .floating-card-2, .floating-card-3, .service-card');
    const techCards = document.querySelectorAll('.tech-card');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Apply 3D perspective to parallax elements
        parallaxElements.forEach(el => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            el.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        });
        
        // Apply 3D tilt to tech cards
        techCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (mouseY - cardCenterY / window.innerHeight) * 5;
            const angleY = (mouseX - cardCenterX / window.innerWidth) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        });
    });

    // Reset tech cards on mouse leave
    document.addEventListener('mouseleave', () => {
        techCards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Animate floating cards with smooth bobbing animation
    const animateFloatingCards = () => {
        floatingCards.forEach((card, index) => {
            const delay = index * 0.1;
            card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            card.style.animationDelay = `${delay}s`;
        });
    };

    animateFloatingCards();

    // ==========================================================================
    // MOUSE LIGHT EFFECT - Interactive glow following mouse
    // ==========================================================================
    const createMouseLight = () => {
        const light = document.createElement('div');
        light.className = 'mouse-light';
        document.body.appendChild(light);
        
        document.addEventListener('mousemove', (e) => {
            light.style.left = e.clientX + 'px';
            light.style.top = e.clientY + 'px';
        });
    };

    createMouseLight();

    // ==========================================================================
    // SCROLL-TRIGGERED CARD ANIMATIONS
    // ==========================================================================
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        cardObserver.observe(card);
    });
    
});
