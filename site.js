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

if (navigation) {
  if ('IntersectionObserver' in window) {
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
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(quotationForm)).toString(),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) throw new Error('Submission failed');
      quotationForm.reset();
      formStatus.dataset.state = 'success';
      formStatus.textContent = 'Thank you. Your quotation request has been received. NEON AIR can follow up using the contact details you shared.';
    } catch {
      formStatus.dataset.state = 'error';
      formStatus.textContent = 'We could not confirm that your request was received. Your details are still here. Please try again, or email info@neonair.in.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = idleButtonContent;
      quotationForm.removeAttribute('aria-busy');
    }
  });
}
