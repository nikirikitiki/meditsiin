// Apply saved font preference globally
function applyFontPreference() {
    const savedFont = localStorage.getItem('meditsiin4.0_font') || 'plus-jakarta';
    document.body.classList.remove('font-inter', 'font-dm-sans', 'font-poppins', 'font-plus-jakarta', 'font-work-sans', 'font-system');
    if (savedFont && savedFont !== 'system') {
        document.body.classList.add(`font-${savedFont}`);
    }
    
    // Update CSS variable for immediate effect
    const fontFamilies = {
        'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'dm-sans': "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'poppins': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'plus-jakarta': "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'work-sans': "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    };
    
    document.documentElement.style.setProperty('--font-family', fontFamilies[savedFont] || fontFamilies['plus-jakarta']);
}

// Apply saved color scheme preference globally
function applyColorSchemePreference() {
    const savedScheme = localStorage.getItem('meditsiin4.0_colorscheme') || 'navy';
    document.documentElement.classList.remove(
        'color-scheme-default',
        'color-scheme-medical',
        'color-scheme-navy',
        'color-scheme-purple',
        'color-scheme-teal',
        'color-scheme-slate'
    );
    
    // Navy is the default (already in :root), so no class needed
    // Only apply class if it's not navy
    if (savedScheme && savedScheme !== 'navy') {
        document.documentElement.classList.add(`color-scheme-${savedScheme}`);
    }
    // If savedScheme is 'navy' or undefined, use default (no class needed)
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Apply preferences on page load
    applyFontPreference();
    applyColorSchemePreference();
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // In a real implementation, you would send this to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', data);
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
            
            // Optional: Reset form after 5 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'flex';
                if (formSuccess) {
                    formSuccess.style.display = 'none';
                }
            }, 5000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.value-card, .offering-card, .problem-item, .future-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

