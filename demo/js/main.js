'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeLoader();
  initializeScrollFunctions();
  initializeNavigation();
  initializeServiceCards();
  initializeProjectFilter();
  initializeContactForm();
  initializeCounterAnimation();
});

// Page loader
function initializeLoader() {
  const loader = document.querySelector('.loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          loader.classList.add('hidden');
          // Start intro animations after loader is hidden
          // Disabled animateHeroSection to keep hero content static
          // animateHeroSection();
        }
      });
    }, 1500);
  });
}

// Scroll functions
function initializeScrollFunctions() {
  // Header scroll effect
  const header = document.getElementById('header');
  const headerScrollThreshold = 50;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > headerScrollThreshold) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  // Initialize reveal animations
  initRevealAnimations();
}

// Initialize reveal animations on scroll
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down, .reveal-scale, .reveal-rotate');
  
  const revealElementsOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check on load
  revealElementsOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealElementsOnScroll);
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Service cards interaction
function initializeServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover-glow');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover-glow');
    });
  });
}

// Project filter functionality
function initializeProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          gsap.to(item, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            clearProps: 'all'
          });
        } else {
          gsap.to(item, {
            scale: 0.8,
            opacity: 0.2,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });
  });
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    console.log('Contact form found, attaching submit event listener.');
    contactForm.addEventListener('submit', function(e) {
      console.log('Contact form submit event triggered.');
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Validate form (simple validation)
      if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill all required fields');
        return;
      }
      
      // Prepare email parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'info.wingsstudios@gmail.com'
      };
      
      // Animate submit button
      const submitBtn = contactForm.querySelector('.btn-submit');
      
      // Send email using EmailJS
      emailjs.send('service_2fkt40p', 'template_w52zims', templateParams)
        .then(() => {
          submitBtn.innerHTML = '<span>Message Sent!</span>';
          submitBtn.classList.add('btn-success');
          setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = '<span>Send Message</span><div class="btn-glow"></div>';
            submitBtn.classList.remove('btn-success');
          }, 3000);
        }, (error) => {
          alert('Failed to send message. Please try again later.');
          console.error('EmailJS error:', error);
        });
    });
  } else {
    console.log('Contact form not found.');
  }
}

// Counter animation for stats
function initializeCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat__number');
  
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Create a ScrollTrigger for each counter
  statNumbers.forEach(statNumber => {
    const finalValue = parseInt(statNumber.dataset.count, 10);
    
    gsap.timeline({
      scrollTrigger: {
        trigger: statNumber,
        start: 'top 80%',
        once: true
      }
    }).add(() => {
      animateValue(statNumber, 0, finalValue, 2000);
    });
  });
}