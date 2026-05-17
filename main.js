/* ── INIT COMPONENTS ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';

  // Render shared nav & footer if containers exist
  if (document.getElementById('nav-container')) renderNav(page);
  if (document.getElementById('footer-container')) renderFooter();

  initNav();
  initScrollReveal();
  initSmoothScroll();

  // Page-specific init
  if (page === 'home') initHome();
  if (page === 'vany') initProductFilter();
  if (page === 'kontakt') initContactForm();
});

/* ── NAV SCROLL STATE ────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const updateNav = () => {
    const isSubpage = !document.querySelector('.hero');
    nav.classList.toggle('scrolled', isSubpage || window.scrollY > 40);
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  let menuOpen = false;
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.mobile-link, .mobile-sublink, .mobile-link--cta').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
    });
  });

  // Mobile dropdown toggles
  mobileMenu.querySelectorAll('.mobile-link--parent').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      const items = btn.nextElementSibling;
      if (items) items.classList.toggle('open');
    });
  });
}

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

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
}

/* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── HOME PAGE ───────────────────────────────────────────── */
function initHome() {
  // Parallax blobs
  const blobs = document.querySelectorAll('.hero__blob');
  if (blobs.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      blobs.forEach((b, i) => {
        const speed = 0.08 + i * 0.04;
        b.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }

  // Collection item hover
  document.querySelectorAll('.collection-item').forEach(item => {
    item.style.transition = 'padding-left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
}

/* ── PRODUCT FILTER ──────────────────────────────────────── */
function initProductFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.pcard');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.category;

      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

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
}
