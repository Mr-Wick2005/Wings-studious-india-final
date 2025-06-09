'use strict';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
function animateHeroSection() {
  // Split text animation for the hero title
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const heroText = heroTitle.textContent;
    const words = heroText.split(' ');
    heroTitle.innerHTML = '';
    
    words.forEach((word) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      wordSpan.textContent = word + ' ';
      heroTitle.appendChild(wordSpan);
    });
    
    gsap.from('.hero__title .word', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }
  
  // Animate hero subtitle
  gsap.from('.hero__subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });
  
  // Animate hero buttons
  gsap.from('.hero__buttons .btn', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    delay: 1.2,
    ease: 'power3.out'
  });
  
  // Animate hero scroll indicator
  gsap.from('.hero__scroll', {
    opacity: 0,
    y: -20,
    duration: 1,
    delay: 1.8,
    ease: 'power3.out'
  });
}

// Initialize all scroll animations
document.addEventListener('DOMContentLoaded', () => {
  // About section animations
  setupAboutAnimations();
  
  // Services section animations
  setupServicesAnimations();
  
  // Team section animations
  setupTeamAnimations();
  
  // Projects section animations
  setupProjectsAnimations();
  
  // Contact section animations
  setupContactAnimations();
});

// About Section Animations
function setupAboutAnimations() {
  // Reveal about subtitle with typing effect
  const aboutSubtitle = document.querySelector('.about__subtitle');
  if (aboutSubtitle) {
    aboutSubtitle.setAttribute('data-text', aboutSubtitle.textContent);
    
    ScrollTrigger.create({
      trigger: '.about__subtitle',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.about__subtitle::before', {
          width: '100%',
          duration: 1.5,
          ease: 'power3.out'
        });
      }
    });
  }
  
  // Animate about text paragraphs
  gsap.from('.about__text', {
    scrollTrigger: {
      trigger: '.about__text',
      start: 'top 80%'
    },
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out'
  });
  
  // Animate about image with glow effect
  gsap.from('.about__image', {
    scrollTrigger: {
      trigger: '.about__image',
      start: 'top 80%'
    },
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power3.out',
    onComplete: () => {
      gsap.to('.frame-glow', {
        opacity: [0.3, 0.7, 0.3],
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });
}

// Services Section Animations
function setupServicesAnimations() {
  // Staggered appearance for service cards
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services__container',
      start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
  
  // Add hover effect enhancement with GSAP
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Team Section Animations
function setupTeamAnimations() {
  // Staggered appearance for team members
  gsap.from('.team-member', {
    scrollTrigger: {
      trigger: '.team__container',
      start: 'top 75%'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  // Enhanced hover effect for team members
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    const memberImage = member.querySelector('.team-member__image');
    const memberInfo = member.querySelector('.team-member__info');
    
    member.addEventListener('mouseenter', () => {
      gsap.to(memberImage, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(memberInfo, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    member.addEventListener('mouseleave', () => {
      gsap.to(memberImage, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(memberInfo, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Projects Section Animations
function setupProjectsAnimations() {
  // Animate project filter buttons
  gsap.from('.filter-btn', {
    scrollTrigger: {
      trigger: '.projects__filter',
      start: 'top 85%'
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  });
  
  // Staggered appearance for project items
  gsap.from('.project-item', {
    scrollTrigger: {
      trigger: '.projects__container',
      start: 'top 75%'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  // Enhanced hover effects for project items
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    const overlay = item.querySelector('.project-item__overlay');
    const image = item.querySelector('.project-item__image');
    
    item.addEventListener('mouseenter', () => {
      gsap.to(overlay, {
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
      
      gsap.to(image, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(overlay, {
        y: '100%',
        duration: 0.4,
        ease: 'power3.out'
      });
      
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// Contact Section Animations
function setupContactAnimations() {
  // Animate contact form appearance
  gsap.from('.contact__form-container', {
    scrollTrigger: {
      trigger: '.contact__form-container',
      start: 'top 75%'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Animate contact info appearance
  gsap.from('.contact__info', {
    scrollTrigger: {
      trigger: '.contact__info',
      start: 'top 75%'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Staggered appearance for contact items
  gsap.from('.contact__item', {
    scrollTrigger: {
      trigger: '.contact__details',
      start: 'top 80%'
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });
  
  // Form input animations
  const formInputs = document.querySelectorAll('.form__input');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input.nextElementSibling.nextElementSibling, {
        width: '100%',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        gsap.to(input.nextElementSibling.nextElementSibling, {
          width: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
}

// Cinematic Section Transitions
function setupSectionTransitions() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    if (index > 0) { // Skip first section (hero)
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1, 
              ease: 'power3.out',
              clearProps: 'opacity,y'
            }
          );
        },
        once: true
      });
    }
  });
}

// Parallax Effects
function setupParallaxEffects() {
  // Hero parallax
  gsap.to('.hero__container', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    ease: 'none'
  });
  
  // About section parallax
  gsap.to('.about__image', {
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: 50,
    ease: 'none'
  });
}

// Initialize all the advanced animations
document.addEventListener('DOMContentLoaded', () => {
  setupSectionTransitions();
  setupParallaxEffects();
});

// Smooth scroll implementation for navigation links
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link, .footer__list a');
  
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
          
          // Close mobile menu if open
          const navMenu = document.querySelector('.nav__menu');
          if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
          }
          
          // Smooth scroll with GSAP
          gsap.to(window, {
            scrollTo: {
              y: targetPosition,
              autoKill: false
            },
            duration: 1.2,
            ease: 'power3.out'
          });
        }
      }
    });
  });
});