// ============================================
// 1. LENIS SMOOTH SCROLL
// ============================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.addEventListener('resize', () => lenis.resize());


// ============================================
// 2. SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.reveal');
let delay = 0;
let timer = null;

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), delay);
            delay += 80;
            observer.unobserve(entry.target);
        }
    });
    clearTimeout(timer);
    timer = setTimeout(() => { delay = 0; }, 200);
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

setTimeout(() => revealElements.forEach(el => revealObserver.observe(el)), 100);


// ============================================
// 3. TYPED.JS — Animasi Ngetik
// ============================================
new Typed('#typed-text', {
    strings: [
        'Merancang <br><span class="text-muted">Pengalaman</span><br>Digital & Visual.',
        'Membangun <br><span class="text-muted">Website Modern</span><br>& Karya Sinematik.'
    ],
    typeSpeed: 45,
    fadeOut: true,
    fadeOutDelay: 500,
    backDelay: 2500,
    startDelay: 1200,
    loop: true,
    contentType: 'html',
    showCursor: true,
    cursorChar: '|'
});


// ============================================
// 4. VANILLA-TILT.JS — 3D Card Hover
// ============================================
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 8,
        speed: 400,
        perspective: 1000,
        scale: 1.01,
        glare: true,
        "max-glare": 0.15
    });
}


// ============================================
// 5. VANTA.NET — Background 3D (Mobile Optimized)
// ============================================
const isMobile = window.innerWidth < 768;

VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3a3a3a,
    backgroundColor: 0x000000,
    points:      isMobile ? 4.00  : 9.00,
    maxDistance: isMobile ? 15.00 : 20.00,
    spacing:     isMobile ? 30.00 : 20.00
});


// ============================================
// 6. VIDEO CARD — Hover (desktop) & Tap (mobile)
// ============================================
const videoCard    = document.getElementById('video-card');
const videoElement = document.getElementById('project-video');
const videoThumb   = document.getElementById('video-thumb');
const videoIcon    = document.getElementById('video-icon');

if (videoCard && videoElement) {

    // Desktop: play on hover
    videoCard.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768) videoElement.play().catch(() => {});
    });
    videoCard.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 768) videoElement.pause();
    });

    // Mobile: toggle on tap
    let isPlayingOnMobile = false;
    videoCard.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            if (!isPlayingOnMobile) {
                videoElement.play()
                    .then(() => {
                        videoElement.style.opacity = "0.6";
                        if (videoThumb) {
                            videoThumb.style.opacity = "0";
                            videoThumb.style.filter  = "grayscale(0)";
                        }
                        if (videoIcon) videoIcon.style.opacity = "0";
                        isPlayingOnMobile = true;
                    })
                    .catch(err => console.log("Autoplay diblokir:", err));
            } else {
                videoElement.pause();
                videoElement.style.opacity = "0";
                if (videoThumb) {
                    videoThumb.style.opacity = "0.2";
                    videoThumb.style.filter  = "grayscale(1)";
                }
                if (videoIcon) videoIcon.style.opacity = "1";
                isPlayingOnMobile = false;
            }
        }
    });
}


// ============================================
// 7. PROJECT CARDS — Mobile tap untuk reveal warna
//    (Kotak 6: project image non-video)
// ============================================
document.querySelectorAll('.project-card:not(#video-card)').forEach(card => {
    let isRevealed = false;
    card.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            const img = card.querySelector('.project-img');
            if (!img) return;
            if (!isRevealed) {
                img.style.filter  = "grayscale(0)";
                img.style.opacity = "0.6";
                img.style.transform = "scale(1.04)";
                isRevealed = true;
            } else {
                img.style.filter  = "grayscale(1)";
                img.style.opacity = "0.2";
                img.style.transform = "scale(1)";
                isRevealed = false;
            }
        }
    });
});


// ============================================
// 8. JAM LOKAL (WIB)
// ============================================
function updateClock() {
    const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(new Date());

    const clockElement = document.getElementById('live-time');
    if (clockElement) clockElement.innerText = `${timeString} WIB`;
}
setInterval(updateClock, 1000);
updateClock();


// ============================================
// 9. CUSTOM CURSOR (Desktop only)
// ============================================
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const dot       = document.querySelector('.cursor-dot');
    const outline   = document.querySelector('.cursor-outline');
    const innerText = document.querySelector('.cursor-text-inner');

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top  = `${mouseY}px`;
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = `${outlineX}px`;
        outline.style.top  = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state — semua elemen interaktif kecuali video card
    document.querySelectorAll('a, button, .tilt-card:not(#video-card)').forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        });
    });

    // Hover state khusus video card
    if (videoCard) {
        videoCard.addEventListener('mouseenter', () => {
            outline.classList.add('cursor-video');
            dot.classList.add('cursor-hover');
            if (innerText) {
                innerText.classList.remove('opacity-0');
                innerText.classList.add('opacity-100');
            }
        });
        videoCard.addEventListener('mouseleave', () => {
            outline.classList.remove('cursor-video');
            dot.classList.remove('cursor-hover');
            if (innerText) {
                innerText.classList.add('opacity-0');
                innerText.classList.remove('opacity-100');
            }
        });
    }
}
