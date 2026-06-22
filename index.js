/* Rojan Educational — vanilla interactions */
(function () {
  /* ----- Smooth-scroll for all [data-scroll] anchors ----- */
  document.querySelectorAll('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      const nav = document.getElementById('navLinks');
      const burger = document.getElementById('hamburger');
      nav?.classList.remove('mobile-open');
      burger?.classList.remove('open');
    });
  });

  /* ----- Mobile hamburger ----- */
  const burger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    burger.classList.toggle('open');
  });

  /* ----- Contact form: client-side validation + success state ----- */
  const form = document.getElementById('contactForm');
  const errEl = document.getElementById('cErr');
  const okEl = document.getElementById('cOk');

  const isEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && v.trim().length <= 160;

  function showError(msg) {
    errEl.textContent = msg;
    errEl.hidden = false;
    okEl.hidden = true;
  }

  function showSuccess() {
    errEl.hidden = true;
    okEl.hidden = false;
    setTimeout(() => (okEl.hidden = true), 3500);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name) return showError('Please enter your name.');
    if (name.length > 80) return showError('Name must be under 80 characters.');
    if (!isEmail(email)) return showError('Please enter a valid email address.');
    if (!message) return showError('Please write a short message.');
    if (message.length > 500) return showError('Message must be under 500 characters.');

    // Success
    form.reset();
    showSuccess();
  });

  /* ----- Reveal-on-scroll micro animation ----- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.card, .cat, .kpi, .resource-card, .ribbon li').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
})();
