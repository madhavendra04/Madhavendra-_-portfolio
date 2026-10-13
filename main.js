/**
 * Mdhavendra Pratap Singh Gautam - Personal Portfolio JavaScript
 * Handles Theme Toggling, Mobile Menu, Scrollspy, Clipboard Actions, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dynamic Current Year in Footer
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Dark / Light Theme Toggling with LocalStorage
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine initial theme: stored preference > system preference > default dark
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  let activeTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
  applyTheme(activeTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const newTheme = htmlRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Menu
  // --------------------------------------------------------------------------
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggleBtn.classList.toggle('active');
      menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggleBtn.classList.remove('active');
          menuToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !menuToggleBtn.contains(event.target)) {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggleBtn.classList.remove('active');
          menuToggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggleBtn.classList.remove('active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scrollspy for Active Navigation Link
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Copy Email to Clipboard with Toast Feedback
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailToCopy = copyEmailBtn.getAttribute('data-email') || 'divyanshu.26@jecrcu.edu.in';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for non-secure contexts or older browsers
          const tempInput = document.createElement('input');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        // Visual feedback on button
        const copyText = copyEmailBtn.querySelector('.copy-text');
        copyEmailBtn.classList.add('copied');
        if (copyText) copyText.textContent = 'Copied!';

        showToast('Email copied to clipboard!');

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          if (copyText) copyText.textContent = 'Copy';
        }, 2500);
      } catch (err) {
        showToast('Failed to copy. Please manually select the email.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Contact Form (Mailto Generator)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const subject = document.getElementById('subject')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const encodedSubject = encodeURIComponent(`Portfolio Message: ${subject || 'New Inquiry'} (from ${name})`);
      const encodedBody = encodeURIComponent(
        `Hi Mdhavendra,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from your portfolio website.`
      );

      const mailtoUrl = `mailto:divyanshu.26@jecrcu.edu.in?subject=${encodedSubject}&body=${encodedBody}`;

      showToast('Opening your email client...');

      // Small delay for smooth toast visibility
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Toast Notification Utility
  // --------------------------------------------------------------------------
  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 8. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const animatedElements = document.querySelectorAll(
    '.about-bio-card, .pillar-card, .skill-category-card, .project-card, .contact-card, .contact-form-card'
  );

  animatedElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    animatedElements.forEach(el => el.classList.add('revealed'));
  }
});
