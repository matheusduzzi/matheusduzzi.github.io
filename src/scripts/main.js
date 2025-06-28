// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Typing animation for hero section
const typingTexts = [
  'Head of Innovation',
  'Estatístico',
  'Data Scientist',
  'Líder de Equipes',
  'Especialista em Analytics'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeText() {
  const currentText = typingTexts[currentTextIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && currentCharIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeText, typeSpeed);
}

// Start typing animation
typeText();

// Navigation functionality
const navbar = document.getElementById('navbar');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const backToTopButton = document.getElementById('back-to-top');

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-white/95');
    navbar.classList.remove('bg-white/80');
  } else {
    navbar.classList.add('bg-white/80');
    navbar.classList.remove('bg-white/95');
  }
  
  // Back to top button
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.add('opacity-0', 'invisible');
    backToTopButton.classList.remove('opacity-100', 'visible');
  }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Articles filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const articleItems = document.querySelectorAll('.article-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter articles
    articleItems.forEach(item => {
      const categories = item.getAttribute('data-category');
      
      if (filter === 'all' || categories.includes(filter)) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-in-out';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');
const formMessages = document.getElementById('form-messages');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;
  
  try {
    // Simulate form submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    formMessages.innerHTML = `
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <strong>Sucesso!</strong> Sua mensagem foi enviada com sucesso. Retornarei em breve!
      </div>
    `;
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    // Show error message
    formMessages.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Erro!</strong> Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato através das redes sociais.
      </div>
    `;
  } finally {
    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formMessages.innerHTML = '';
    }, 5000);
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Skills progress bars animation
const skillBars = document.querySelectorAll('.skill-percentage');
const skillsSection = document.getElementById('skills');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.transition = 'width 1.5s ease-in-out';
          bar.style.width = width;
        }, 200);
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('loading');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => {
  img.classList.add('loading');
  imageObserver.observe(img);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 10);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    'images/perfil.jpg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  preloadCriticalResources();
  
  // Add loading class to body and remove after everything is loaded
  document.body.classList.add('loading');
  
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
  });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    console.warn(`Failed to load image: ${this.src}`);
  });
});

// Console message for developers
console.log(`
🚀 Portfolio de Matheus Duzzi Ribeiro
📊 Desenvolvido com tecnologias modernas
💡 Interessado em colaborar? Entre em contato!
🔗 LinkedIn: https://www.linkedin.com/in/matheusduzziribeiro/
`);