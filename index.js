// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

let currentSlide = 0;
const totalSlides = 3;
const autoplaySpeed = 5000;
let autoplayInterval;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM Ready - Initializing carousel & menu');
  initCarousel();
  startAutoplay();
  initMegaMenu();
});

/**
 * Initialize carousel
 */
function initCarousel() {
  updateCarouselPosition();
  updateDots();
  console.log('✅ Carousel initialized');
}

/**
 * Update carousel position
 */
function updateCarouselPosition() {
  const carousel = document.getElementById('carousel');
  if (!carousel) {
    console.error('❌ Carousel element not found!');
    return;
  }
  const offset = currentSlide * -100;
  carousel.style.transform = `translateX(${offset}%)`;
}

/**
 * Update dot indicators
 */
function updateDots() {
  const dots = document.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/**
 * Next slide
 */
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarouselPosition();
  updateDots();
}

/**
 * Previous slide
 */
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarouselPosition();
  updateDots();
}

/**
 * Go to specific slide
 */
function goToSlide(n) {
  currentSlide = n;
  updateCarouselPosition();
  updateDots();
  resetAutoplay();
  console.log(`🎯 Jumped to slide ${n}`);
}

/**
 * Start autoplay
 */
function startAutoplay() {
  autoplayInterval = setInterval(function() {
    nextSlide();
  }, autoplaySpeed);
  console.log('▶️ Autoplay started');
}

/**
 * Reset autoplay
 */
function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// ============================================
// MEGA MENU FUNCTIONALITY - ENHANCED
// ============================================

function initMegaMenu() {
  const megaMenuItems = document.querySelectorAll('.mega-menu-item');

  megaMenuItems.forEach(item => {
    const trigger = item.querySelector('.products-trigger');
    const menu = item.querySelector('.mega-menu');

    if (trigger && menu) {
      // Hover to open
      item.addEventListener('mouseenter', function() {
        openMegaMenu(menu);
      });

      // Click to toggle on touch devices
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          menu.classList.toggle('active');
        }
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const megaItems = document.querySelectorAll('.mega-menu-item');
    megaItems.forEach(item => {
      if (!item.contains(e.target)) {
        closeMegaMenu(item.querySelector('.mega-menu'));
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const menus = document.querySelectorAll('.mega-menu');
      menus.forEach(menu => closeMegaMenu(menu));
    }
  });
}

/**
 * Open mega menu with animation
 */
function openMegaMenu(menu) {
  if (!menu) return;
  menu.style.opacity = '1';
  menu.style.visibility = 'visible';
  menu.style.transform = 'translateX(-50%) translateY(0)';
  console.log('📂 Mega menu opened');
}

/**
 * Close mega menu
 */
function closeMegaMenu(menu) {
  if (!menu) return;
  menu.style.opacity = '0';
  menu.style.visibility = 'hidden';
  menu.style.transform = 'translateX(-50%) translateY(-20px)';
}

// ============================================
// MOBILE MENU
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.querySelector('ul.hidden');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (navMenu) {
        navMenu.classList.toggle('hidden');
        console.log('📱 Mobile menu toggled');
      }
    });
  }

  // Close menu when clicking links
  if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.add('hidden');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const nav = document.querySelector('nav');
    if (navMenu && nav && !nav.contains(e.target)) {
      navMenu.classList.add('hidden');
    }
  });
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target && href !== '#') {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

function observeElements() {
  if (!('IntersectionObserver' in window)) {
    console.warn('⚠️ IntersectionObserver not supported');
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.product-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ============================================
// ARROW ANIMATION ON PRODUCTS HOVER
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const productsTrigger = document.querySelector('.products-trigger');
  
  if (productsTrigger) {
    const arrow = productsTrigger.querySelector('svg');
    
    productsTrigger.addEventListener('mouseenter', function() {
      if (arrow) {
        arrow.style.transform = 'rotate(180deg)';
      }
    });
    
    const megaMenu = productsTrigger.closest('.mega-menu-item').querySelector('.mega-menu');
    if (megaMenu) {
      megaMenu.addEventListener('mouseleave', function() {
        if (arrow) {
          arrow.style.transform = 'rotate(0deg)';
        }
      });
    }
  }
});

console.log('✨ Script loaded successfully - All features active');