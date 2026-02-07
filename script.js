// ========================================
// PARALLAXE PROFOND - DEEP MOTION
// ========================================
let scrollY = 0;
let ticking = false;

function updateParallax() {
    scrollY = window.pageYOffset;
    
    // Peluche s'avance selon le scroll avec translateZ pour l'effet 3D
    const plush = document.querySelector('.plush-float');
    if (plush) {
        const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
        const zTranslate = scrollProgress * 200; // Avance de 200px en profondeur
        const scale = 1 + (scrollProgress * 0.3); // Grossit jusqu'à 1.3x
        plush.style.transform = `translateZ(${zTranslate}px) scale(${scale})`;
    }
    
    // Icônes orbitaux tournent selon le scroll
    const orbitals = document.querySelectorAll('.orbital-icon');
    orbitals.forEach((icon, index) => {
        const rotation = (scrollY * 0.3) + (index * 60);
        const distance = 180 + (scrollY * 0.05);
        icon.style.transform = `rotate(${rotation}deg) translateX(${distance}px) rotate(-${rotation}deg)`;
    });
    
    // Background layers avec profondeur
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.setProperty('--scroll-depth', scrollY * 0.5 + 'px');
    }
    
    // Parallaxe différentielle sur les sections - chaque section à une vitesse différente
    const sections = document.querySelectorAll('.why-offer, .presentation, .emotional-value, .pricing, .reassurance, .testimonials');
    sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight && sectionTop > -section.offsetHeight) {
            // Vitesse différente pour chaque section
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollY * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
    
    // Cartes avec rotation 3D et profondeur selon le scroll
    const cards = document.querySelectorAll('.reason-card, .benefit-card, .testimonial-card');
    cards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight && cardTop > -card.offsetHeight) {
            const progress = 1 - (cardTop / windowHeight);
            const spread = index % 2 === 0 ? progress * 20 : -progress * 20;
            const depth = progress * 80;
            // Garder la rotation 3D comme demandé
            card.style.transform = `translateX(${spread}px) translateZ(${depth}px) rotateY(${spread * 0.2}deg)`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Init au chargement
updateParallax();

// ========================================
// CURSOR PERSONNALISÉ - Desktop uniquement
// ========================================
if (window.innerWidth > 1024) {
    document.addEventListener('DOMContentLoaded', function() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.body.style.setProperty('--mouse-x', mouseX + 'px');
            document.body.style.setProperty('--mouse-y', mouseY + 'px');
        });
    });
}

// ========================================
// EXPLOSION DE CŒURS AU CLIC - Tous appareils
// ========================================
document.addEventListener('click', function(e) {
    // Créer 8 cœurs Font Awesome qui explosent
    for (let i = 0; i < 8; i++) {
        createHeartExplosion(e.clientX, e.clientY, i);
    }
});

function createHeartExplosion(x, y, index) {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = getRandomColor();
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);
    
    // Animation d'explosion
    setTimeout(() => {
        const angle = (index / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        heart.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg) scale(0)`;
        heart.style.opacity = '0';
    }, 10);
    
    // Supprimer après l'animation
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function getRandomColor() {
    const colors = ['#FF0000', '#FF1493', '#FF69B4', '#DC143C'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// PLUIE D'ICÔNES SAINT-VALENTIN - Font Awesome
// ========================================
const valentineIcons = [
    'fa-heart',
    'fa-gift',
    'fa-spa',          // Pétales de rose
    'fa-heart-pulse',
    'fa-dove',
    'fa-ring'
];

function createValentineRain() {
    const icon = document.createElement('div');
    const randomIcon = valentineIcons[Math.floor(Math.random() * valentineIcons.length)];
    
    icon.innerHTML = `<i class="fa-solid ${randomIcon}"></i>`;
    icon.className = 'valentine-rain-icon';
    icon.style.position = 'fixed';
    icon.style.left = Math.random() * 100 + '%';
    icon.style.top = '-50px';
    icon.style.color = getRandomColor();
    icon.style.fontSize = Math.random() * 15 + 15 + 'px';
    icon.style.opacity = Math.random() * 0.4 + 0.3;
    icon.style.pointerEvents = 'none';
    icon.style.zIndex = '1';
    icon.style.transition = 'all ' + (Math.random() * 10 + 15) + 's linear';
    
    document.body.appendChild(icon);
    
    // Animation de chute
    setTimeout(() => {
        icon.style.top = '110vh';
        icon.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 720}deg)`;
        icon.style.opacity = '0';
    }, 100);
    
    // Supprimer après l'animation
    setTimeout(() => {
        icon.remove();
    }, 25000);
}

// Créer une pluie continue d'icônes toutes les 2 secondes
setInterval(createValentineRain, 2000);

// Créer quelques icônes au chargement
for (let i = 0; i < 5; i++) {
    setTimeout(() => createValentineRain(), i * 400);
}

// ========================================
// ANIMATION AU SCROLL (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observer toutes les cartes
document.querySelectorAll('.reason-card, .benefit-card, .testimonial-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ========================================
// EFFET MAGNÉTIQUE SUR LES BOUTONS
// ========================================
document.querySelectorAll('.cta-primary').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', function() {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ========================================
// HOVER 3D SUR LES CARTES - Avec rotation 3D
// ========================================
document.querySelectorAll('.reason-card, .testimonial-card, .benefit-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    });
});

// ========================================
// COMPTEUR ANIMÉ JUSQU'À LA SAINT-VALENTIN
// ========================================
function updateCountdown() {
    const valentine = new Date('2025-02-14T00:00:00');
    const now = new Date();
    const diff = valentine - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        document.querySelectorAll('.final-cta-note').forEach(note => {
            if (!note.dataset.original) {
                note.dataset.original = note.textContent;
            }
            note.textContent = `Plus que ${days}j ${hours}h avant la Saint-Valentin · Livraison garantie`;
        });
    }
}

updateCountdown();
setInterval(updateCountdown, 60000);

// ========================================
// TRANSITIONS FONDUES ENTRE SECTIONS
// ========================================
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observer toutes les sections pour les transitions fondues
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

console.log('🎨 Site showcase activé - Parallaxe profond + Pluie d\'icônes Valentine actifs !');