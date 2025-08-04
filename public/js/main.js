document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  }

  // Hamburger Menu
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  document.querySelector('.nav-menu').appendChild(hamburger);
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    gsap.to(navLinks, {
      duration: 0.3,
      opacity: navLinks.classList.contains('active') ? 1 : 0,
      y: navLinks.classList.contains('active') ? 0 : -20,
    });
  });

  // Close menu when clicking a link on mobile
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '☰';
        gsap.to(navLinks, { duration: 0.3, opacity: 0, y: -20 });
      }
    });
  });

  // Page Transition Animation
  gsap.to('.page-transition', {
    duration: 0.5,
    x: '100%',
    onComplete: () => {
      document.querySelector('.page-transition').style.display = 'none';
    },
  });

  // Scroll-to-Top Button
  const scrollToTop = document.querySelector('.scroll-to-top');
  window.addEventListener('scroll', () => {
    scrollToTop.classList.toggle('visible', window.scrollY > 300);
  });

  scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ScrollReveal Animations
  ScrollReveal().reveal('.section-home, .section-about, .section-skills, .section-experience, .section-resume, .section-contact', {
    duration: 1000,
    distance: '50px',
    easing: 'ease-out',
    origin: 'bottom',
    reset: false,
    mobile: true,
  });

  // GSAP Animations for Skills Bars
  document.querySelectorAll('.progress').forEach(bar => {
    gsap.to(bar, {
      width: bar.dataset.width,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
      },
    });
  });

  // GSAP Animation for Tawk.to Widget
  if (typeof Tawk_API !== 'undefined') {
    Tawk_API.onLoad = function () {
      const chatWidget = document.querySelector('#tawkto-overlay');
      if (chatWidget) {
        gsap.from(chatWidget, {
          duration: 1,
          opacity: 0,
          scale: 0.5,
          ease: 'back.out(1.7)',
          delay: 1,
        });
      }
    };
  }

  // Typing Animation for Home Page
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }
});
