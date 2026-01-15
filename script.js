// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Section observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Navbar shadow
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow =
        window.scrollY > 0
            ? '0 4px 12px rgba(0,0,0,.5)'
            : '0 4px 6px rgba(0,0,0,.3)';
});

// Timeline animation
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = '0.6s ease';

    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, i * 100);
        }
    }, { threshold: 0.2 }).observe(item);
});

// Hover efektleri SADECE DESKTOP
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.content-card, .event-item, .perspective-card')
        .forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
}

// Scroll progress
const bar = document.createElement('div');
bar.style.cssText = `
position:fixed;top:0;left:0;height:4px;
background:linear-gradient(135deg,#667eea,#764ba2);
z-index:9999`;
document.body.appendChild(bar);

window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / h) * 100 + '%';
});

// Parallax SADECE DESKTOP
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrollY * 0.3}px)`;
            hero.style.opacity = 1 - scrollY / 500;
        }
    });
}

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 200) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
});
