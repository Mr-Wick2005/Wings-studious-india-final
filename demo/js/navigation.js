'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation functionality
  initMobileNavigation();
  
  // Smooth scroll implementation
  initSmoothScroll();
  
  // Header scroll class
  initHeaderScroll();
});

// Mobile navigation functionality
function initMobileNavigation() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Show menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      
      // Animate menu items
      gsap.from('.nav__item', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.2
      });
    });
  }
  
  // Hide menu
  if (navClose) {
    navClose.addEventListener('click', () => {
      gsap.to('.nav__item', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          navMenu.classList.remove('show-menu');
          // Reset opacity and transform for future animations
          gsap.set('.nav__item', { clearProps: 'opacity,y' });
        }
      });
    });
  }
  
  // Close menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show-menu')) {
        gsap.to('.nav__item', {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.2,
          ease: 'power3.in',
          onComplete: () => {
            navMenu.classList.remove('show-menu');
            // Reset opacity and transform for future animations
            gsap.set('.nav__item', { clearProps: 'opacity,y' });
          }
        });
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    // If navMenu exists and is shown, and the click is outside navMenu and not on navToggle
    if (
      navMenu && 
      navMenu.classList.contains('show-menu') && 
      !navMenu.contains(e.target) && 
      !navToggle.contains(e.target)
    ) {
      gsap.to('.nav__item', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          navMenu.classList.remove('show-menu');
          // Reset opacity and transform for future animations
          gsap.set('.nav__item', { clearProps: 'opacity,y' });
        }
      });
    }
  });
}

// Smooth scroll implementation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav__link, .footer__list a, .hero__buttons a, .service-card__link, .project-item__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Header scroll class
function initHeaderScroll() {
  const header = document.getElementById('header');
  const scrollThreshold = 50;
  
  function toggleHeaderClass() {
    if (window.scrollY >= scrollThreshold) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  }
  
  // Initial check
  toggleHeaderClass();
  
  // Listen for scroll
  window.addEventListener('scroll', toggleHeaderClass);
}

// Active link highlighting based on scroll position
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  // Get current scroll position
  const scrollY = window.pageYOffset;
  
  // For each section, check if it's in view
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100; // Adjust offset as needed
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // For each nav link, remove active class
      navLinks.forEach(link => {
        link.classList.remove('active');
        
        // If link href matches current section, add active class
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Call the highlight function on scroll
window.addEventListener('scroll', highlightActiveLink);

// Initialize on page load
document.addEventListener('DOMContentLoaded', highlightActiveLink);