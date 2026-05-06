document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Visitor Counter
    // ===============================
    function initVisitorCounter() {
        const counterKey = 'pramuka_visitors';
        let count = parseInt(localStorage.getItem(counterKey), 10);

        if (isNaN(count)) {
            count = 0;
        }

        count += 1;
        localStorage.setItem(counterKey, count);

        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.textContent = count.toLocaleString('id-ID');
        }
    }

    initVisitorCounter();

    // ===============================
    // Sticky Navbar on Scroll
    // ===============================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'linear-gradient(135deg, #0052a3 0%, #0078cc 100%)';
        } else {
            navbar.style.padding = '0';
            navbar.style.background = 'linear-gradient(135deg, #0066cc 0%, #0099ff 50%, #00ccff 100%)';
        }
    });


    // ===============================
    // Mobile Menu Toggle
    // ===============================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.style.display === 'block';

            navMenu.style.display = isOpen ? 'none' : 'block';

            if (!isOpen) {
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'linear-gradient(135deg, #0066cc 0%, #0099ff 100%)';
                navMenu.style.padding = '20px';

                const ul = navMenu.querySelector('ul');
                if (ul) {
                    ul.style.flexDirection = 'column';
                    ul.style.textAlign = 'center';
                }
            }
        });
    }


    // ===============================
    // ✅ Smooth Scroll (FIX ERROR #)
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            const href = this.getAttribute('href');

            // ❗ skip kalau cuma "#"
            if (!href || href === '#') return;

            const target = document.querySelector(href);

            // ❗ kalau target tidak ada, skip
            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth'
            });

            // Tutup menu mobile
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.style.display = 'none';
            }
        });
    });


    // ===============================
    // Scroll Animation
    // ===============================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = "translateY(30px)";
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        observer.observe(section);
    });


    // ===============================
    // Active Nav Link on Scroll
    // ===============================
    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu ul li a');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');

            if (href && href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });


    // ===============================
    // Lightbox
    // ===============================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeLightbox = document.getElementById("close-lightbox");

    document.querySelectorAll(".gallery-image img").forEach(img => {
        img.addEventListener("click", () => {
            if (!lightbox || !lightboxImg) return;

            lightbox.classList.add("show");
            lightboxImg.src = img.src;

            if (lightboxCaption) {
                lightboxCaption.textContent = img.alt;
            }
        });
    });

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener("click", () => {
            lightbox.classList.remove("show");
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove("show");
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox) {
            lightbox.classList.remove("show");
        }
    });

});