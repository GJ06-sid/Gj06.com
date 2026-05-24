/* ============================================
   GJ 06 — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Custom Cursor ----
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('clicking'));
  } else if (cursor) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    document.querySelectorAll('button, a').forEach(el => el.style.cursor = 'pointer');
  }

  // ---- Chai Loader ----
  const loader = document.getElementById('loader');
  if (loader) {
    // Hide loader after animation completes
    const hideLoader = () => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    };
    // Total animation duration ~3.2s
    setTimeout(hideLoader, 3400);
  }

  // ---- Hamburger Nav ----
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navClose   = document.getElementById('navClose');

  if (hamburger && navOverlay) {
    hamburger.addEventListener('click', () => {
      navOverlay.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    const closeNav = () => {
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (navClose) navClose.addEventListener('click', closeNav);

    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Close on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ---- Sticky Navbar ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- Scroll Reveal (IntersectionObserver) ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ---- Page Transitions ----
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    // Animate out on load
    pageTransition.classList.add('exit');
    setTimeout(() => pageTransition.style.display = 'none', 500);

    // Animate in on link click (same-origin links only)
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('http') &&
        !href.startsWith('mailto') &&
        !href.startsWith('tel')
      ) {
        link.addEventListener('click', e => {
          e.preventDefault();
          pageTransition.style.display = 'block';
          pageTransition.classList.remove('exit');
          pageTransition.classList.add('enter');
          setTimeout(() => { window.location.href = href; }, 420);
        });
      }
    });
  }

  // ---- Marquee duplicate for seamless loop ----
  const marqueeInner = document.querySelector('.marquee-inner');
  if (marqueeInner) {
    const clone = marqueeInner.cloneNode(true);
    marqueeInner.parentElement.appendChild(clone);
  }

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 64;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
