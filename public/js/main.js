document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
      localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
      gsap.from(themeToggle, { rotation: 360, duration: 0.5, ease: 'power2.out' });
    });
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.textContent = '☀️';
    }
  } else {
    console.warn('Theme toggle button not found');
  }

  // Hamburger Menu
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.appendChild(hamburger);
  } else {
    console.warn('Nav menu not found');
  }
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
      gsap.to(navLinks, {
        duration: 0.3,
        opacity: navLinks.classList.contains('active') ? 1 : 0,
        y: navLinks.classList.contains('active') ? 0 : -20,
      });
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          hamburger.innerHTML = '☰';
          gsap.to(navLinks, { duration: 0.3, opacity: 0, y: -20 });
        }
      });
    });
  } else {
    console.warn('Nav links not found');
  }

  // Page Transition
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    gsap.to(pageTransition, {
      duration: 0.5,
      x: '100%',
      ease: 'power2.in',
      onComplete: () => {
        pageTransition.style.display = 'none';
      },
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        gsap.to(pageTransition, {
          duration: 0.5,
          x: '0%',
          ease: 'power2.out',
          onComplete: () => {
            window.location.href = href;
          },
        });
      });
    });
  } else {
    console.warn('Page transition element not found');
  }

  // Scroll to Top
  const scrollToTop = document.querySelector('.scroll-to-top');
  if (scrollToTop) {
    window.addEventListener('scroll', () => {
      scrollToTop.style.opacity = window.scrollY > 200 ? 1 : 0;
    });
    scrollToTop.addEventListener('click', () => {
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.out' });
    });
  } else {
    console.warn('Scroll-to-top button not found');
  }

  // Home Page: Enhanced Typing Animation
  if (document.querySelector('.section-home')) {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      console.log('Typing text element found, starting animation');
      const text = "I am Subhash, DevOps and Cloud Expert";
      typingText.textContent = '';
      const letters = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        typingText.appendChild(span);
        return span;
      });
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.textContent = '|';
      typingText.appendChild(cursor);
      gsap.set(letters, { opacity: 0, scale: 0, color: '#fff' });
      gsap.to(letters, {
        opacity: 1,
        scale: 1,
        color: '#00c4b4',
        duration: 0.05,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        onComplete: () => {
          console.log('Typing animation completed');
          typingText.classList.add('glow');
          gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true });
        },
      });
      gsap.from('.cta-button', { duration: 1.2, scale: 0.8, opacity: 0, delay: 2.8, ease: 'elastic.out(1, 0.5)' });
      gsap.to('.parallax-bg', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.section-home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    } else {
      console.warn('Typing text element not found in home.html');
    }
  }

  // About Page: Profile and Timeline Animations
  if (document.querySelector('.section-about')) {
    gsap.from('.profile-img', {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.section-about', start: 'top 80%' },
    });
    gsap.from('.about-content p', {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.section-about', start: 'top 80%' },
    });
    gsap.from('.timeline-item', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.section-about', start: 'top 80%' },
    });
  }

  // Skills Page: Skill Bar Animations
  if (document.querySelector('.section-skills')) {
    gsap.from('.skill-category', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.section-skills', start: 'top 80%' },
    });
    document.querySelectorAll('.progress').forEach(bar => {
      gsap.to(bar, {
        width: bar.dataset.width,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 80%' },
      });
    });
  }

  // Experience Page: Timeline Animations
  if (document.querySelector('.section-experience')) {
    gsap.from('.timeline-item', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.section-experience', start: 'top 80%' },
    });
  }

  // Resume Page: Content Animations
  if (document.querySelector('.section-resume')) {
    gsap.from('.resume-content p', { duration: 1, opacity: 0, y: 50, ease: 'power3.out', scrollTrigger: { trigger: '.section-resume', start: 'top 80%' } });
    gsap.from('.resume-button', { duration: 1, scale: 0.8, opacity: 0, delay: 0.3, ease: 'elastic.out(1, 0.5)', scrollTrigger: { trigger: '.section-resume', start: 'top 80%' } });
    gsap.from('.resume-preview', { duration: 1, opacity: 0, y
