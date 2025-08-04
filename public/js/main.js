import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded');

  // Loading Screen
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-screen';
  loadingScreen.innerHTML = '<h1 class="text-white text-4xl">Loading...</h1>';
  document.body.appendChild(loadingScreen);
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 500);
  });

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
      localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-theme');
      themeToggle.textContent = '☀️';
    }
  }

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger') || document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu && !navMenu.contains(hamburger)) navMenu.appendChild(hamburger);
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
      gsap.fromTo(navLinks, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          hamburger.innerHTML = '☰';
          gsap.to(navLinks, { y: -20, opacity: 0, duration: 0.3 });
        }
      });
    });
  }

  // Page Transition
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    gsap.set(pageTransition, { x: '100%' });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        gsap.to(pageTransition, { x: '0%', duration: 0.5, ease: 'power2.inOut', onComplete: () => {
          window.location.href = href;
        }});
      });
    });
  }

  // Typing Animation
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const text = "I am Subhash, DevOps and Cloud Expert";
    typingText.innerHTML = '';
    const letters = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      typingText.appendChild(span);
      return span;
    });
    gsap.from(letters, {
      opacity: 0,
      scale: 0,
      duration: 0.05,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      onComplete: () => gsap.to('.cursor', { opacity: 0, duration: 0.5, repeat: -1, yoyo: true })
    });
  }

  // Parallax and Scroll Animations
  gsap.to('.parallax-bg', {
    y: 100,
    ease: 'none',
    scrollTrigger: { trigger: '.section-home', start: 'top top', end: 'bottom top', scrub: true }
  });

  ['.section-about', '.section-skills', '.section-experience', '.section-contact', '.section-resume'].forEach(selector => {
    if (document.querySelector(selector)) {
      gsap.from(`${selector} > *`, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: selector, start: 'top 80%' }
      });
    }
  });

  gsap.from('.profile-img', {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.section-about', start: 'top 80%' }
  });

  gsap.from('.cta-button', {
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    delay: 1,
    ease: 'elastic.out(1, 0.5)'
  });

  // Scroll to Top
  const scrollToTop = document.querySelector('.scroll-to-top');
  if (scrollToTop) {
    ScrollTrigger.create({
      start: 200,
      onUpdate: (self) => {
        scrollToTop.classList.toggle('visible', self.direction === 1);
      }
    });
    scrollToTop.addEventListener('click', () => gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.out' }));
  }

  // Contact Form Submission
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          contactForm.reset();
          gsap.from(contactForm, { opacity: 0, scale: 0.9, duration: 0.5, ease: 'power2.out' });
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Form submission error:', error);
      }
    });
  }
});
