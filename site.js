const navigation = document.querySelector('#primary-navigation');
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const updateHeaderOffset = () => {
    document.documentElement.style.setProperty('--header-offset', `${siteHeader.getBoundingClientRect().height}px`);
  };
  updateHeaderOffset();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateHeaderOffset).observe(siteHeader);
  } else {
    window.addEventListener('resize', updateHeaderOffset);
  }
}

if (navigation && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries.filter((entry) => entry.isIntersecting);
    if (!visibleSections.length) return;
    const currentSection = visibleSections[visibleSections.length - 1].target.id;
    navigation.querySelectorAll('a:not(.nav-quote)').forEach((link) => {
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-150px 0px -50% 0px', threshold: 0 });

  document.querySelectorAll('main > section[id]').forEach((section) => {
    if (navigation.querySelector(`a[href="#${section.id}"]`)) sectionObserver.observe(section);
  });
}

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('#service');
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

document.querySelectorAll('[data-state]').forEach((link) => {
  link.addEventListener('click', () => {
    const locationInput = document.querySelector('#location');
    if (locationInput) locationInput.value = link.dataset.state;
  });
});

const quotationForm = document.querySelector('#quotation-form');
if (quotationForm) {
  quotationForm.action = 'https://formsubmit.co/ajax/info@neonair.in';
  quotationForm.removeAttribute('data-netlify');
  quotationForm.removeAttribute('netlify-honeypot');

  const netlifyFormName = quotationForm.querySelector('input[name="form-name"]');
  if (netlifyFormName) netlifyFormName.remove();

  const botField = quotationForm.querySelector('input[name="bot-field"]');
  if (botField) botField.name = '_honey';

  const hiddenFields = {
    _subject: 'New NEON AIR quotation request',
    _template: 'table',
    _url: window.location.href.split('#')[0],
  };

  Object.entries(hiddenFields).forEach(([name, value]) => {
    let input = quotationForm.querySelector(`input[name="${name}"]`);
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      quotationForm.prepend(input);
    }
    input.value = value;
  });

  const submitButton = quotationForm.querySelector('button[type="submit"]');
  const formStatus = document.querySelector('#form-status');
  const idleButtonContent = submitButton.innerHTML;

  quotationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitButton.disabled || !quotationForm.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending your request…';
    quotationForm.setAttribute('aria-busy', 'true');
    formStatus.dataset.state = 'loading';
    formStatus.textContent = 'Sending your quotation request…';

    try {
      const payload = Object.fromEntries(new FormData(quotationForm).entries());
      const response = await fetch('https://formsubmit.co/ajax/info@neonair.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error('Submission failed');

      quotationForm.reset();
      window.location.href = 'thank-you.html';
    } catch {
      formStatus.dataset.state = 'error';
      formStatus.textContent = 'We could not confirm that your request was received. Please try again, or email info@neonair.in.';
      submitButton.disabled = false;
      submitButton.innerHTML = idleButtonContent;
      quotationForm.removeAttribute('aria-busy');
    }
  });
}
