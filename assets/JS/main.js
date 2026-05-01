/* =========================
   SIDEBAR MENU
========================= */
const btn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

if (btn && sidebar) {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    function closeSidebar() {
        sidebar.classList.remove('active');
    }

    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
            closeSidebar();
        }
    });

    window.addEventListener('scroll', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

/* =========================
   BARBER CARDS TOGGLE
========================= */
const cards = document.querySelectorAll('.barberCard');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();

        cards.forEach(c => {
            if (c !== card) c.classList.remove('active');
        });

        card.classList.toggle('active');
    });
});

/* =========================
   MAP ANIMATION (SCROLL)
========================= */
const mapSection = document.querySelector('.map-section');

if (mapSection) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.2
    });

    mapObserver.observe(mapSection);
}

/* =========================
   FLOATING BUTTONS HIDE ON FOOTER
========================= */
const floating = document.querySelector('.floating-buttons');
const footer = document.querySelector('.footerWrapper');

if (floating && footer) {
    window.addEventListener('scroll', () => {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight) {
            floating.classList.add('hide');
        } else {
            floating.classList.remove('hide');
        }
    });
}

/* =========================
   GALLERY MODAL + SWIPE
========================= */
const items = document.querySelectorAll('.gallery-item img');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

let currentIndex = 0;
let startX = 0;

function openModal(index) {
    if (!modal || !modalImg) return;

    currentIndex = index;
    modal.style.display = 'flex';
    modalImg.src = items[currentIndex].src;
}

items.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    modal.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            currentIndex = (currentIndex + 1) % items.length;
            modalImg.src = items[currentIndex].src;
        }

        if (endX - startX > 50) {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            modalImg.src = items[currentIndex].src;
        }
    });
}

/* =========================
   GALLERY SCROLL ANIMATION
========================= */
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length) {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    galleryItems.forEach(item => {
        item.classList.add('hidden');
        galleryObserver.observe(item);
    });
}

const form = document.querySelector(".contact-form");
const button = form.querySelector("button");

let turnstileToken = null;

// 🔐 callbacks globais (Cloudflare Turnstile)
window.onTurnstileSuccess = function (token) {
    turnstileToken = token;
};

window.onTurnstileExpired = function () {
    turnstileToken = null;
};

// 🚀 submit handler
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
        alert("Por favor confirma que não és um robô.");
        return;
    }

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        token: turnstileToken
    };

    console.log("TOKEN:", turnstileToken);
    console.log("DATA:", data);

    try {
        button.disabled = true;
        button.textContent = "A enviar...";

        const response = await fetch("https://original-cut-stack-production.up.railway.app/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log("RESPONSE:", result);

        if (!response.ok) {
            throw new Error(result.error || "Erro ao enviar mensagem");
        }

        alert("Mensagem enviada com sucesso!");
        form.reset();
        turnstileToken = null;

    } catch (error) {
        console.error(error);
        alert("Erro ao enviar. Tenta novamente.");
    } finally {
        button.disabled = false;
        button.textContent = "Enviar Mensagem";
    }
});