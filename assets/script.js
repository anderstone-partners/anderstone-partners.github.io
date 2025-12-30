// Mobile menu toggle and small enhancements
(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (open) {
        siteNav.querySelector('a')?.focus();
      }
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Contact form validation (client-side only, no submit)
  const form = document.getElementById('contact-form');
  if (form) {
    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      company: document.getElementById('company'),
      message: document.getElementById('message')
    };
    const errors = {
      name: document.getElementById('name-error'),
      email: document.getElementById('email-error'),
      company: document.getElementById('company-error'),
      message: document.getElementById('message-error')
    };
    const success = document.getElementById('form-success');

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function setError(input, errorEl, message) {
      if (!errorEl) return;
      errorEl.textContent = message;
      input?.setAttribute('aria-invalid', 'true');
    }
    function clearError(input, errorEl) {
      if (!errorEl) return;
      errorEl.textContent = '';
      input?.removeAttribute('aria-invalid');
    }

    function validate() {
      let ok = true;
      // Name
      if (!fields.name.value.trim()) {
        setError(fields.name, errors.name, 'Please enter your name.');
        ok = false;
      } else {
        clearError(fields.name, errors.name);
      }
      // Email
      if (!fields.email.value.trim()) {
        setError(fields.email, errors.email, 'Please enter your email.');
        ok = false;
      } else if (!validateEmail(fields.email.value.trim())) {
        setError(fields.email, errors.email, 'Please enter a valid email.');
        ok = false;
      } else {
        clearError(fields.email, errors.email);
      }
      // Company
      if (!fields.company.value.trim()) {
        setError(fields.company, errors.company, 'Please enter your company.');
        ok = false;
      } else {
        clearError(fields.company, errors.company);
      }
      // Message
      if (!fields.message.value.trim()) {
        setError(fields.message, errors.message, 'Please add a short message.');
        ok = false;
      } else {
        clearError(fields.message, errors.message);
      }
      return ok;
    }

    // If the page was redirected back with ?success=1 show the success message
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === '1' && success) {
        success.hidden = false;
      }
    } catch (e) {}

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validate();
      if (ok) {
        // Submit the form to the configured action (formsubmit.co).
        // Using form.submit() bypasses this submit handler and performs a full POST.
        form.submit();
      } else if (success) {
        success.hidden = true;
      }
    });

    Object.values(fields).forEach((input) => {
      input?.addEventListener('input', () => {
        // Live-validate the single field
        validate();
      });
    });
  }
})();

