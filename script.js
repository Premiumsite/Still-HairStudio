// --- NAVBAR SCROLL STATE ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- YENİLENMİŞ & KUSURSUZ YAĞMUR ANİMASYONU ---
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
let width, height, drops = [];

function initRain() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    const isMobile = width < 768;
    const dropCount = isMobile ? 45 : 250; 
    
    drops = [];
    for (let i = 0; i < dropCount; i++) {
        drops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 25 + 15,
            speed: Math.random() * 6 + 5,
            opacity: Math.random() * 0.18 + 0.05
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, width, height);
    
    drops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(212, 175, 55, ${drop.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        
        drop.y += drop.speed;
        
        if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
        }
    });
    
    requestAnimationFrame(drawRain);
}

window.addEventListener('resize', initRain);
initRain();
drawRain();

// --- SIFIRDAN YAZILMIŞ, KESİN ÇALIŞAN SCROLL REVEAL (INTERSECTION OBSERVER) ---
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });
});