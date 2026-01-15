// ========================================
// MOBİL + WINDOWS OPTİMİZASYONU
// ========================================

// Sayfa yüklenmeden ÖNCE mobil kontrolü
(function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobilde sections'ı HEMEN görünür yap
        const style = document.createElement('style');
        style.id = 'mobile-fix';
        style.textContent = `
            .content-section {
                opacity: 1 !important;
                transform: translateY(0) !important;
                visibility: visible !important;
            }
            .hero {
                min-height: 100vh !important;
                height: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
})();

// DOMContentLoaded - Sayfa hazır olunca
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    
    // Mobilde tüm sections'ı hemen göster
    if (isMobile) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.classList.add('visible');
        });
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Menu linklerine tıklandığında menüyü kapat
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll için Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Tüm section'ları gözlemle (sadece DESKTOP için)
if (window.innerWidth > 768) {
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}

// Navbar scroll efekti
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        }
        
        lastScroll = currentScroll;
    });
}

// Timeline animasyonu
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach((item, index) => {
    if (window.innerWidth <= 768) {
        // Mobilde HEMEN göster
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    } else {
        // Desktop'ta animasyonlu
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    }
});

// Card hover efekti (sadece DESKTOP)
if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.content-card, .event-item, .perspective-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Parallax efekti (sadece DESKTOP)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Timeline marker click event
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('click', function() {
        const content = this.parentElement.querySelector('.timeline-content');
        
        // Tüm içerikleri normale döndür
        document.querySelectorAll('.timeline-content').forEach(c => {
            if (c !== content) {
                c.style.transform = 'scale(1)';
                c.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            }
        });
        
        // Seçili içeriği vurgula (sadece desktop)
        if (window.innerWidth > 768) {
            content.style.transform = 'scale(1.1)';
            content.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.5)';
        }
    });
});

// Sayfa yüklendiğinde animasyonlar
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    
    // Hero section animasyonu
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease forwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 1s ease 0.3s forwards';
    }
    if (ctaButton) {
        ctaButton.style.animation = 'fadeInUp 1s ease 0.6s forwards';
    }
});

// Kartlara tıklama efekti (sadece DESKTOP)
if (window.innerWidth > 768) {
    document.querySelectorAll('.content-card, .perspective-card').forEach(card => {
        card.addEventListener('click', function() {
            // Ripple efekti
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// CSS animasyon tanımı
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console'da hoş geldin mesajı
console.log('%c Ermeni Meselesi Tarih Projesi ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Bu site eğitim amaçlı hazırlanmıştır. ', 'color: #8b5cf6; font-size: 14px;');
console.log('%c ✅ Mobil + Desktop Optimizasyonu Aktif ', 'color: #10b981; font-size: 12px; font-weight: bold;');
