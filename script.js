/**
 * Madhavendra Pratap Singh Gautam - Personal Portfolio
 * Interactive Functionality: Theme Switcher, Mobile Navigation,
 * ScrollSpy, Copy-to-Clipboard, and Scroll Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if available
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* -------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light)
     ------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || (prefersDarkScheme.matches ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;

    if (theme === 'light') {
      icon.setAttribute('data-lucide', 'moon');
    } else {
      icon.setAttribute('data-lucide', 'sun');
    }
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* -------------------------------------------------------------
     2. HEADER SCROLL SHADOW & BLUR
     ------------------------------------------------------------- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  /* -------------------------------------------------------------
     3. MOBILE NAVIGATION MENU
     ------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer?.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* -------------------------------------------------------------
     4. SCROLLSPY (ACTIVE NAV LINK HIGHLIGHT)
     ------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* -------------------------------------------------------------
     5. EMAIL COPY TO CLIPBOARD & TOAST NOTIFICATION
     ------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message = 'Copied to clipboard!') {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'madhavendra@jecrcu.edu.in';
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
          .then(() => showToast('Email copied to clipboard!'))
          .catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    });
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy. Please manually copy email.');
    }
    document.body.removeChild(tempInput);
  }

  /* -------------------------------------------------------------
     6. CONTACT FORM SUBMISSION HANDLER
     ------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all fields.');
        return;
      }

      // Construct mailto link so user's default email client opens with the message pre-filled
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:madhavendra@jecrcu.edu.in?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client...');
      contactForm.reset();
    });
  }

  /* -------------------------------------------------------------
     7. SCROLL REVEAL ANIMATIONS
     ------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
});
