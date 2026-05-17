/* ── NAV SCROLL STATE ────────────────────────────────────── */
const nav = document.getElementById('nav');
const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── HAMBURGER ───────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburger.setAttribute('aria-expanded', menuOpen);
});

mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── CONTACT FORM ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Odesíláno…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Odesláno!';
    btn.style.background = '#4a9e6e';
    form.reset();
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1200);
});

/* ── PARALLAX BLOBS (subtle) ─────────────────────────────── */
const blobs = document.querySelectorAll('.hero__blob');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  blobs.forEach((b, i) => {
    const speed = 0.08 + i * 0.04;
    b.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

/* ── COLLECTION HOVER TRANSITION ────────────────────────── */
document.querySelectorAll('.collection-item').forEach(item => {
  item.style.transition = 'padding-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});
