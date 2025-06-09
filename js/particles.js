'use strict';

// Particle animation disabled as per user request
// document.addEventListener('DOMContentLoaded', function() {
//   initParticles();
// });

const cameraShapePoints = [
  // Approximate camera shape points normalized 0 to 1
  { x: 0.3, y: 0.3 },
  { x: 0.35, y: 0.25 },
  { x: 0.4, y: 0.2 },
  { x: 0.45, y: 0.18 },
  { x: 0.5, y: 0.17 },
  { x: 0.55, y: 0.18 },
  { x: 0.6, y: 0.2 },
  { x: 0.65, y: 0.25 },
  { x: 0.7, y: 0.3 },
  { x: 0.7, y: 0.35 },
  { x: 0.7, y: 0.4 },
  { x: 0.7, y: 0.45 },
  { x: 0.7, y: 0.5 },
  { x: 0.7, y: 0.55 },
  { x: 0.7, y: 0.6 },
  { x: 0.7, y: 0.65 },
  { x: 0.7, y: 0.7 },
  { x: 0.65, y: 0.75 },
  { x: 0.6, y: 0.8 },
  { x: 0.55, y: 0.82 },
  { x: 0.5, y: 0.83 },
  { x: 0.45, y: 0.82 },
  { x: 0.4, y: 0.8 },
  { x: 0.35, y: 0.75 },
  { x: 0.3, y: 0.7 },
  { x: 0.3, y: 0.65 },
  { x: 0.3, y: 0.6 },
  { x: 0.3, y: 0.55 },
  { x: 0.3, y: 0.5 },
  { x: 0.3, y: 0.45 },
  { x: 0.3, y: 0.4 },
  { x: 0.3, y: 0.35 },
  // Lens circle points
  { x: 0.5, y: 0.4 },
  { x: 0.53, y: 0.43 },
  { x: 0.56, y: 0.46 },
  { x: 0.59, y: 0.5 },
  { x: 0.56, y: 0.54 },
  { x: 0.53, y: 0.57 },
  { x: 0.5, y: 0.6 },
  { x: 0.47, y: 0.57 },
  { x: 0.44, y: 0.54 },
  { x: 0.41, y: 0.5 },
  { x: 0.44, y: 0.46 },
  { x: 0.47, y: 0.43 }
];

function initParticles() {
  const particlesContainer = document.getElementById('particles');
  
  if (!particlesContainer) return;
  
  // Configuration
  const config = {
    particleCount: 200, // increased particles
    particleSize: { min: 2, max: 4 },
    speed: { min: 0.5, max: 1.5 },
    opacity: { min: 0.6, max: 1 },
    colors: ['#FFD700', '#FFC107', '#FFB300'], // golden colors
    positionVariation: 0.05,
    connectParticles: true,
    connectionDistance: 120,
    connectionOpacity: 0.5
  };
  
  // Clear existing particles if any
  particlesContainer.innerHTML = '';
  
  // Get container dimensions
  const containerRect = particlesContainer.getBoundingClientRect();
  
  // Calculate shape center offset to center the camera shape in container
  // Shape x coordinates range roughly from 0.3 to 1.0, so width ~0.7
  // Center at 0.65, offset to 0.5 (center)
  const shapeCenterX = 0.65;
  const offsetX = 0.5 - shapeCenterX;
  
  // Shape y coordinates range roughly from 0.17 to 0.83, center ~0.5
  const shapeCenterY = 0.5;
  const offsetY = 0.5 - shapeCenterY;
  
  // Create particles and assign target positions from camera shape with centering offset
  for (let i = 0; i < config.particleCount; i++) {
    createParticle(particlesContainer, config, i, offsetX, offsetY, containerRect);
  }
  
  // Create connections between particles
  if (config.connectParticles) {
    createConnections(particlesContainer, config);
  }
  
  // Add interactivity with mouse
  addMouseInteraction(particlesContainer, config);
}

function createParticle(container, config, index, offsetX, offsetY, containerRect) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random properties
  const size = randomInRange(config.particleSize.min, config.particleSize.max);
  const opacity = randomInRange(config.opacity.min, config.opacity.max);
  const color = config.colors[Math.floor(Math.random() * config.colors.length)];
  
  // Set particle style
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.backgroundColor = color;
  particle.style.opacity = opacity.toString();
  particle.style.borderRadius = '50%';
  particle.style.boxShadow = '0 0 8px 2px rgba(255, 215, 0, 0.8)'; // glowing effect
  
  // Position the particle initially randomly
  const x = Math.random() * containerRect.width;
  const y = Math.random() * containerRect.height;
  
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  
  // Assign target position from wings shape points (loop if fewer points than particles)
  const shapePoint = wingsShapePoints[index % wingsShapePoints.length];
  const targetX = (shapePoint.x + offsetX) * containerRect.width;
  const targetY = (shapePoint.y + offsetY) * containerRect.height;
  
  // Add data attributes for animation and target position
  particle.dataset.x = x;
  particle.dataset.y = y;
  particle.dataset.targetX = targetX;
  particle.dataset.targetY = targetY;
  particle.dataset.speed = randomInRange(config.speed.min, config.speed.max);
  
  // Add to container
  container.appendChild(particle);
  
  // Animate the particle to move to target position with gentle floating
  animateParticleToShape(particle, containerRect);
}

// Animate a particle moving to its target shape position with gentle floating
function animateParticleToShape(particle, containerRect) {
  const duration = parseFloat(particle.dataset.speed) * 10;
  const delay = Math.random() * 2;
  
  const targetX = parseFloat(particle.dataset.targetX);
  const targetY = parseFloat(particle.dataset.targetY);
  
  // Floating range around target position
  const floatRange = 5;
  
  // Calculate random floating offset
  const floatX = (Math.random() - 0.5) * floatRange;
  const floatY = (Math.random() - 0.5) * floatRange;
  
  gsap.to(particle, {
    x: targetX - parseFloat(particle.dataset.x) + floatX,
    y: targetY - parseFloat(particle.dataset.y) + floatY,
    duration: duration,
    delay: delay,
    ease: 'sine.inOut',
    onComplete: () => {
      // Continue floating animation around target
      animateParticleToShape(particle, containerRect);
    }
  });
}

// Create connections between particles
function createConnections(container, config) {
  setInterval(() => {
    const particles = container.querySelectorAll('.particle');
    const particlePositions = [];
    
    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      particlePositions.push({
        element: particle,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    });
    
    particlePositions.forEach((particle, i) => {
      for (let j = i + 1; j < particlePositions.length; j++) {
        const other = particlePositions[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
          
          gsap.to(particle.element, {
            opacity: Math.min(1, parseFloat(particle.element.style.opacity) + opacity * 0.1),
            duration: 0.3,
            ease: 'power1.out'
          });
          
          gsap.to(other.element, {
            opacity: Math.min(1, parseFloat(other.element.style.opacity) + opacity * 0.1),
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      }
    });
  }, 1000);
}

// Add mouse interaction
function addMouseInteraction(container, config) {
  container.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const particles = container.querySelectorAll('.particle');
    
    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;
      
      const dx = mouseX - particleX;
      const dy = mouseY - particleY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const targetX = particleX - Math.cos(angle) * 20;
        const targetY = particleY - Math.sin(angle) * 20;
        
        gsap.to(particle, {
          x: targetX - parseFloat(particle.dataset.x),
          y: targetY - parseFloat(particle.dataset.y),
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // Return to target shape position after repelling
            animateParticleToShape(particle, container.getBoundingClientRect());
          }
        });
      }
    });
  });
}

// Helper function for random range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
