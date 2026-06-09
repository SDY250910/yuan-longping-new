// Prof. Yuan Longping Digital Archive - Simplified Version
// Removed video controls as we're using Bilibili embed

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Prof. Yuan Longping Digital Archive initialized');
    
    // Initialize smooth scrolling for navigation
    initSmoothScrolling();
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize contribution card animations
    initCardAnimations();
    
    // Initialize gallery image loading
    initGalleryLoading();
    
    // Add active class to current nav link
    highlightActiveNavLink();
});

// Navigation Functions
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight nav link on scroll
    window.addEventListener('scroll', highlightActiveNavLink);
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animation Functions
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

function initCardAnimations() {
    const cards = document.querySelectorAll('.contribution-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility Functions
function initGalleryLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        // Add loading attribute for lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Add error handling for broken images
        img.addEventListener('error', function() {
            this.src = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
            console.warn('Gallery image failed to load, using fallback');
        });
    });
}

// Bilibili iframe responsiveness
function handleBilibiliResize() {
    const iframe = document.querySelector('.bilibili-iframe');
    if (iframe) {
        const container = iframe.parentElement;
        const width = container.offsetWidth;
        iframe.style.height = (width * 0.5625) + 'px'; // 16:9 aspect ratio
    }
}

// Handle window resize
window.addEventListener('resize', handleBilibiliResize);

// Initial call
setTimeout(handleBilibiliResize, 100);

console.log('All scripts loaded successfully - Bilibili version');