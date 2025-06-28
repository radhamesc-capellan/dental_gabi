// Efectos JavaScript para OdontoLima

// Scroll Reveal - Animaciones al hacer scroll
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Observar elementos con clase scroll-reveal
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });
}

// Animaciones de entrada secuenciales
function initStaggeredAnimations() {
  const elements = document.querySelectorAll('.stagger-animate');
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add('animate-fade-in-up');
  });
}

// Contador animado
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Iniciar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// Validación de formularios mejorada
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validación en tiempo real
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearError);
      
      // Efecto de focus
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
    
    // Validación al enviar
    form.addEventListener('submit', handleFormSubmit);
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';
  
  // Remover errores previos
  clearFieldError(field);
  
  // Validaciones específicas
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Este campo es obligatorio';
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Ingresa un email válido';
    }
  } else if (field.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = 'Ingresa un teléfono válido';
    }
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
}

function showFieldError(field, message) {
  field.classList.add('error', 'shake');
  field.style.borderColor = '#ef4444';
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = '#ef4444';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  
  field.parentElement.appendChild(errorDiv);
  
  // Remover clase shake después de la animación
  setTimeout(() => {
    field.classList.remove('shake');
  }, 500);
}

function clearFieldError(field) {
  field.classList.remove('error');
  field.style.borderColor = '';
  
  const errorMessage = field.parentElement.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

function clearError(e) {
  if (e.target.classList.contains('error')) {
    clearFieldError(e.target);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = submitBtn.querySelector('.submit-text');
  const submitLoading = submitBtn.querySelector('.submit-loading');
  const originalText = submitText.textContent;
  
  // Mostrar loading
  submitBtn.disabled = true;
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');
  
  // Simular envío (aquí iría la lógica real)
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Éxito
    showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
    form.reset();
    
  } catch (error) {
    // Error
    showNotification('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    submitLoading.classList.add('hidden');
  }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type} fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm bounce`;
  
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  };
  
  notification.classList.add(colors[type]);
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remover después de 5 segundos
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Efecto de parallax suave
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Navegación suave
function initSmoothNavigation() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Efecto de hover en tarjetas
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.hover-lift');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Lazy loading para imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('skeleton');
        img.classList.add('animate-scale-in');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

// Efectos de micro-interacciones
function initMicroInteractions() {
  // Efecto de ripple en botones
  const buttons = document.querySelectorAll('button, .btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Efecto de focus mejorado
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('focused');
    });
    
    element.addEventListener('blur', () => {
      element.classList.remove('focused');
    });
  });
}

// Efecto de scroll progress
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress fixed top-0 left-0 w-full h-1 bg-cyan-700 z-50 transform origin-left';
  progressBar.style.transform = 'scaleX(0)';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    
    progressBar.style.transform = `scaleX(${scrollPercent})`;
  });
}

// Efecto de smooth reveal para imágenes
function initImageReveal() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('image-revealed');
        imageObserver.unobserve(entry.target);
      }
    });
  });
  
  images.forEach(img => {
    img.classList.add('image-loading');
    imageObserver.observe(img);
  });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStaggeredAnimations();
  initCounters();
  initFormValidation();
  initParallax();
  initSmoothNavigation();
  initCardHoverEffects();
  initLazyLoading();
  initMicroInteractions();
  initScrollProgress();
  initImageReveal();
  
  console.log('🎉 Efectos JavaScript cargados exitosamente');
});

// Efectos adicionales para mejor UX
window.addEventListener('load', () => {
  // Remover skeleton loading
  document.querySelectorAll('.skeleton').forEach(el => {
    el.classList.remove('skeleton');
  });
  
  // Mostrar contenido con animación
  document.body.classList.add('loaded');
});

// Menú móvil glassmorphism
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  
  function openMobileMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Animación del overlay
    setTimeout(() => {
      mobileOverlay.classList.add('bg-black/20');
    }, 10);
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    mobileOverlay.classList.add('hidden');
    mobileOverlay.classList.remove('bg-black/20');
    document.body.style.overflow = '';
  }
  
  if (mobileMenuBtn && mobileMenu && mobileOverlay) {
    // Abrir menú
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    
    // Cerrar menú con botón X
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú con overlay
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Cerrar menú con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
        closeMobileMenu();
      }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a[href^="/"]');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
  }
}); 