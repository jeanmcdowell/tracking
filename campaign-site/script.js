// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const open = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Donate amount selection
const amountButtons = document.querySelectorAll('.amounts button');
amountButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    amountButtons.forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// Mock form handling — no real backend
document.querySelectorAll('form[data-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.querySelector('.form-success');
    if (success) {
      success.hidden = false;
    } else {
      const note = document.createElement('p');
      note.className = 'form-success';
      note.textContent = 'Thanks — placeholder form, no data was submitted.';
      form.appendChild(note);
    }
    form.querySelectorAll('input, textarea').forEach((el) => {
      if (el.type !== 'submit' && el.type !== 'button') el.value = '';
    });
    form.querySelectorAll('input[type="checkbox"]').forEach((el) => (el.checked = false));
  });
});
