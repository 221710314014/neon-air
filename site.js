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
  const submitButton = quotationForm.querySelector('button[type="submit"]');
  const formStatus = document.querySelector('#form-status');
  const idleButtonContent = submitButton.innerHTML;

  const restoreSubmitState = () => {
    submitButton.disabled = false;
    submitButton.innerHTML = idleButtonContent;
    quotationForm.removeAttribute('aria-busy');
    if (formStatus) {
      formStatus.textContent = '';
      delete formStatus.dataset.state;
    }
  };

  quotationForm.addEventListener('submit', (event) => {
    if (!quotationForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending your request…';
    quotationForm.setAttribute('aria-busy', 'true');
    if (formStatus) {
      formStatus.dataset.state = 'loading';
      formStatus.textContent = 'Sending your quotation request…';
    }
  });

  window.addEventListener('pageshow', restoreSubmitState);
}
