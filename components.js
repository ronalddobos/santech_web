/* ── SANTECH Shared Components ──────────────────────────── */

const SANTECH = {
  nav: {
    logo: `<a href="index.html" class="nav__logo"><span class="nav__logo-mark">S</span>ANTECH</a>`,
    items: [
      {
        label: 'Vany',
        href: 'vany.html',
        id: 'vany',
        dropdown: [
          { label: 'Všechny vany', href: 'vany.html' },
          { label: 'Kolekce NEW TIME', href: 'kolekce-new-time.html' },
          { label: 'Série SHARP', href: 'serie-sharp.html' },
          { label: 'Koncepty', href: 'koncepty.html' }
        ]
      },
      { label: 'Wellness', href: 'wellness.html', id: 'wellness' },
      { label: 'O nás', href: 'o-nas.html', id: 'o-nas' },
      { label: 'Kontakt', href: 'kontakt.html', id: 'kontakt' },
      { label: 'Ke stažení', href: 'ke-stazeni.html', id: 'ke-stazeni' }
    ],
    cta: { label: 'Kde koupit', href: 'prodejci.html', id: 'prodejci' }
  }
};

function renderNav(activePage) {
  const items = SANTECH.nav.items.map(item => {
    const isActive = item.id === activePage || (item.dropdown && item.dropdown.some(d => d.href.replace('.html','') === activePage));
    const activeClass = isActive ? ' nav__link--active' : '';

    if (item.dropdown) {
      const dropdownItems = item.dropdown.map(d => {
        const subActive = d.href.replace('.html','') === activePage ? ' class="active"' : '';
        return `<a href="${d.href}"${subActive}>${d.label}</a>`;
      }).join('');
      return `<div class="nav__dropdown">
        <a href="${item.href}" class="nav__link${activeClass}">${item.label} <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
        <div class="nav__dropdown-menu">${dropdownItems}</div>
      </div>`;
    }
    return `<a href="${item.href}" class="nav__link${activeClass}">${item.label}</a>`;
  }).join('');

  const ctaActive = SANTECH.nav.cta.id === activePage ? ' nav__cta--active' : '';
  const cta = `<a href="${SANTECH.nav.cta.href}" class="nav__cta${ctaActive}">${SANTECH.nav.cta.label}</a>`;

  const mobileItems = SANTECH.nav.items.map(item => {
    if (item.dropdown) {
      const subs = item.dropdown.map(d => `<a href="${d.href}" class="mobile-sublink">${d.label}</a>`).join('');
      return `<div class="mobile-dropdown">
        <button class="mobile-link mobile-link--parent">${item.label} <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="mobile-dropdown__items">${subs}</div>
      </div>`;
    }
    return `<a href="${item.href}" class="mobile-link">${item.label}</a>`;
  }).join('');

  document.getElementById('nav-container').innerHTML = `
    <header class="nav" id="nav">
      ${SANTECH.nav.logo}
      <nav class="nav__links">${items}${cta}</nav>
      <button class="nav__hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileItems}
      <a href="${SANTECH.nav.cta.href}" class="mobile-link mobile-link--cta">${SANTECH.nav.cta.label}</a>
    </div>
  `;
}

function renderFooter() {
  document.getElementById('footer-container').innerHTML = `
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__brand">
        <div class="footer__logo"><span class="nav__logo-mark">S</span>ANTECH</div>
        <p>České vany prémiové kvality.<br/>Výroba od roku 1995.</p>
      </div>
      <nav class="footer__nav">
        <div class="footer__col">
          <h4>Produkty</h4>
          <a href="vany.html">Všechny vany</a>
          <a href="kolekce-new-time.html">Kolekce NEW TIME</a>
          <a href="serie-sharp.html">Série SHARP</a>
          <a href="wellness.html">Wellness systémy</a>
          <a href="koncepty.html">Koncepty</a>
        </div>
        <div class="footer__col">
          <h4>Společnost</h4>
          <a href="o-nas.html">O nás</a>
          <a href="kontakt.html">Kontakt</a>
          <a href="prodejci.html">Kde koupit</a>
          <a href="ke-stazeni.html">Ke stažení</a>
        </div>
        <div class="footer__col">
          <h4>Kontakt</h4>
          <span class="footer__text">SANTECH plus s.r.o.</span>
          <span class="footer__text">Horní Lhota 180</span>
          <span class="footer__text">763 23 Dolní Lhota u Luhačovic</span>
          <a href="mailto:objednavky@santech.cz">objednavky@santech.cz</a>
        </div>
      </nav>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2025 SANTECH plus s.r.o. Všechna práva vyhrazena.</p>
      <div class="footer__bottom-links">
        <a href="ke-stazeni.html">Ke stažení</a>
        <span>·</span>
        <a href="kontakt.html">Kontakt</a>
      </div>
    </div>
  </footer>`;
}

function renderPageHeader(title, subtitle, breadcrumbs, bgImage) {
  const crumbs = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) return `<span class="breadcrumb__current">${b.label}</span>`;
    return `<a href="${b.href}" class="breadcrumb__link">${b.label}</a>`;
  }).join('<span class="breadcrumb__sep">/</span>');

  const bgStyle = bgImage ? ` style="background-image: url('${bgImage}')"` : '';

  return `
  <section class="page-header"${bgStyle}>
    <div class="page-header__overlay"></div>
    <div class="page-header__content">
      <nav class="breadcrumb">${crumbs}</nav>
      <h1 class="page-header__title">${title}</h1>
      ${subtitle ? `<p class="page-header__sub">${subtitle}</p>` : ''}
    </div>
  </section>`;
}

function renderProductCard(product) {
  const price = product.price
    ? `${product.price.toLocaleString('cs-CZ')} Kč`
    : product.price_from
      ? `od ${product.price_from.toLocaleString('cs-CZ')} Kč`
      : '';
  const dims = product.dimensions ? `<span class="pcard__dims">${product.dimensions} cm</span>` : '';
  const badge = product.new ? '<span class="pcard__badge">Novinka</span>' : '';
  const imgSrc = product.image || 'data/images/products/time.jpg';

  return `
  <div class="pcard" data-category="${product.category || ''}">
    <div class="pcard__visual">
      <img src="${imgSrc}" alt="Vana ${product.name}" loading="lazy" />
      ${badge}
    </div>
    <div class="pcard__body">
      <span class="pcard__cat">${product.categoryLabel || ''}</span>
      <h3 class="pcard__name">${product.name}</h3>
      <div class="pcard__meta">
        ${dims}
        ${price ? `<span class="pcard__price">${price}</span>` : ''}
      </div>
    </div>
  </div>`;
}

function formatPrice(val) {
  if (!val) return '';
  return val.toLocaleString('cs-CZ');
}
