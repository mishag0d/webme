/**
 * MASIEL — UGC CREATOR & INFLUENCER
 * Clean Editorial Script (White & Guinda Theme)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. INICIALIZAR PÉTALOS DE CEREZO (SAKURA CANVAS)
    initSakuraCanvas();

    // 2. NAVEGACIÓN STICKY & SCROLL EFFECT
    initNavbarScroll();

    // 3. MENÚ MÓVIL TOGGLE
    initMobileNav();

    // 4. COPIAR CORREO CON NOTIFICACIÓN TOAST
    initCopyEmail();

    // 5. INICIALIZAR SWIPER GALERÍA FOTOGRÁFICA SIN BORDES
    initSwiperClean();
});

/* ==========================================================================
   1. SAKURA PETALS CANVAS (Pétalos sutiles para fondo blanco y crema)
   ========================================================================== */
function initSakuraCanvas() {
    const canvas = document.getElementById('sakura-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = window.innerWidth < 768 ? 14 : 26;
    const petals = [];

    // Tonos de pétalos con perfecta visibilidad y delicadeza sobre blanco
    const petalColors = [
        'rgba(247, 181, 196, 0.70)',
        'rgba(232, 142, 161, 0.60)',
        'rgba(255, 195, 208, 0.75)',
        'rgba(189, 71, 94, 0.40)'
    ];

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.size = 8 + Math.random() * 8;
            this.speedY = 0.7 + Math.random() * 1.2;
            this.speedX = 0.2 + Math.random() * 0.7;
            this.angle = Math.random() * Math.PI * 2;
            this.angularSpeed = (Math.random() - 0.5) * 0.02;
            this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
            this.sway = Math.random() * 1.8;
            this.swaySpeed = 0.01 + Math.random() * 0.02;
            this.swayAngle = 0;
        }

        update() {
            this.y += this.speedY;
            this.swayAngle += this.swaySpeed;
            this.x += Math.sin(this.swayAngle) * this.sway + this.speedX;
            this.angle += this.angularSpeed;

            if (this.y > height + 20 || this.x > width + 20) {
                this.reset();
                this.y = -20;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
            ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach((petal) => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   2. NAVEGACIÓN SCROLL
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.site-nav');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   3. MENÚ MÓVIL
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const links = document.querySelectorAll('.mobile-nav-drawer a');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    links.forEach((link) => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

/* ==========================================================================
   4. COPIAR CORREO AL PORTAPAPELES
   ========================================================================== */
function initCopyEmail() {
    const copyBtns = document.querySelectorAll('.btn-copy-action');
    const toast = document.getElementById('copy-toast');

    if (!copyBtns.length) return;

    copyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const email = 'contactomasiel@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast();
            }).catch(() => {
                const input = document.createElement('input');
                input.value = email;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                showToast();
            });
        });
    });

    function showToast() {
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3200);
        }
    }
}

/* ==========================================================================
   5. SWIPER LIMPIO Y SIN BORDES
   ========================================================================== */
function initSwiperClean() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.myUgcSwiper', {
        slidesPerView: 1.4,
        spaceBetween: 18,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2.4,
                spaceBetween: 22,
            },
            1024: {
                slidesPerView: 3.6,
                spaceBetween: 26,
            },
            1400: {
                slidesPerView: 4.8,
                spaceBetween: 28,
            },
        },
    });
}
