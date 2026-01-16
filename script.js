
// MOBİL + WINDOWS OPTİMİZASYONU
// ========================================

// Sayfa yüklenmeden ÖNCE mobil kontrolü
(function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
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

    // Initialize all features
    initMobileMenu();
    initScrollEffects();
    initTimelineAnimations();
    initCardHoverEffects();
    initScrollProgress();
    initParallax();
    initActiveNavigation();
    initFAQ();
    initGallery();
    initPageLoad();
});

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
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
}

// ========================================
// SCROLL EFFECTS
// ========================================
function initScrollEffects() {
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
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
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

// ========================================
// TIMELINE ANIMATIONS
// ========================================
function initTimelineAnimations() {
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
}

// ========================================
// CARD HOVER EFFECTS (sadece DESKTOP)
// ========================================
function initCardHoverEffects() {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.content-card, .event-item, .perspective-card, .personality-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
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
}

// ========================================
// PARALLAX EFFECT (sadece DESKTOP)
// ========================================
function initParallax() {
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
}

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================
function initActiveNavigation() {
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
}

// ========================================
// YENİ: SSS (FAQ) ACCORDION
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Eğer tıklanan zaten açıksa, kapat
            const isActive = item.classList.contains('active');
            
            // Tüm FAQ'ları kapat
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Eğer kapalıysa, aç
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// YENİ: GALERİ LIGHTBOX
// ========================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            showLightbox(title);
        });
    });
}

function showLightbox(title) {
    // Lightbox oluştur
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class=\"lightbox-content\">
            <span class=\"lightbox-close\">&times;</span>
            <h3>${title}</h3>
            <div class=\"lightbox-info\">
                <p>📄 Bu belge T.C. Devlet Arşivleri Başkanlığı ve Genelkurmay ATAŞE Başkanlığı arşivlerinde mevcuttur.</p>
                <p>🔍 Araştırmacılar için açık olan arşivlerden incelenebilir.</p>
                <p style=\"margin-top: 1rem; padding: 1rem; background: rgba(99, 102, 241, 0.2); border-radius: 8px;\">
                    <strong>Not:</strong> Gerçek belge fotoğrafları telif hakları nedeniyle bu web sitesinde gösterilmemektedir. 
                    Belgelere ulaşmak için resmi arşivleri ziyaret edebilirsiniz.
                </p>
            </div>
        </div>
    `;
    
    // CSS ekle
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Kapatma
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => closeLightbox(lightbox));
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    // ESC tuşu ile kapatma
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeLightbox(lightbox) {
    lightbox.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
    }, 300);
}

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================
function initPageLoad() {
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
}

// ========================================
// RIPPLE EFFECT ON CARDS (sadece DESKTOP)
// ========================================
if (window.innerWidth > 768) {
    document.querySelectorAll('.content-card, .perspective-card, .personality-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ========================================
// CSS ANIMATIONS
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes rippleEffect {
        to {
            width: 500px;
            height: 500px;
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
    
    .lightbox-content {
        background: var(--card-bg);
        padding: 3rem;
        border-radius: 15px;
        max-width: 700px;
        width: 90%;
        position: relative;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1.5rem;
        font-size: 3rem;
        color: var(--text-primary);
        cursor: pointer;
        transition: color 0.3s ease;
        line-height: 1;
    }
    
    .lightbox-close:hover {
        color: var(--danger);
    }
    
    .lightbox-content h3 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        padding-right: 2rem;
    }
    
    .lightbox-info {
        color: var(--text-secondary);
        line-height: 1.8;
    }
    
    .lightbox-info p {
        margin: 1rem 0;
    }
    
    /* Smooth scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--darker-bg);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--secondary-color);
    }
`;
document.head.appendChild(style);

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c Ermeni Meselesi Tarih Projesi ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Bu site eğitim amaçlı hazırlanmıştır. ', 'color: #8b5cf6; font-size: 14px;');
console.log('%c ✅ Mobil + Desktop Optimizasyonu Aktif ', 'color: #10b981; font-size: 12px; font-weight: bold;');
console.log('%c 🆕 6 Yeni Bölüm Eklendi: SSS, Haritalar, Galeri, Şahsiyetler, Uluslararası Tepkiler, ASALA-PKK ', 'color: #f59e0b; font-size: 12px; font-weight: bold;');
