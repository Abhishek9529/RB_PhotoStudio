// RB Photo Studio - Vanilla JavaScript interactions
const header = document.getElementById('siteHeader');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function resolveImageUrls(relativePaths) {
  return relativePaths.map(path => new URL(path, import.meta.url).href);
}

function handleHeaderScroll() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll();

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
}

// Active navigation by current file name
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});

// Home hero slideshow
const homeHero = document.querySelector('.home-hero');
const heroSlideshow = document.querySelector('.hero-slideshow');
const heroPrevButton = document.querySelector('[data-hero-action="prev"]');
const heroNextButton = document.querySelector('[data-hero-action="next"]');
const heroToggleButton = document.querySelector('[data-hero-action="toggle"]');

if (homeHero && heroSlideshow) {
  const homeSlides = resolveImageUrls([
    '../assets/images/home-page-images/home-page.jpg',
    '../assets/images/home-page-images/home-img2.png',
    '../assets/images/home-page-images/home-img4.png',
    '../assets/images/home-page-images/home-img5.jpeg',
    '../assets/images/home-page-images/home-img6.jpeg'
  ]).map((src, index) => ({
    name: `home-slide-${index + 1}`,
    src
  }));

  if (homeSlides.length > 0) {
    heroSlideshow.innerHTML = '';

    homeSlides.forEach(({ name, src }, index) => {
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = `linear-gradient(90deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.08) 38%, rgba(0, 0, 0, 0.2) 100%), url("${src}")`;
      slide.setAttribute('aria-hidden', 'true');
      slide.dataset.slideName = name;
      slide.dataset.slideIndex = String(index);
      heroSlideshow.appendChild(slide);
    });

    const slides = Array.from(heroSlideshow.querySelectorAll('.hero-slide'));
    const slideCount = slides.length;
    const intervalMs = 4000;
    let currentSlide = 0;
    let timerId = null;
    let isPlaying = true;

    function renderSlide(nextIndex) {
      currentSlide = (nextIndex + slideCount) % slideCount;
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });
    }

    function updateToggleButton() {
      if (!heroToggleButton) return;
      heroToggleButton.dataset.state = isPlaying ? 'pause' : 'play';
      heroToggleButton.setAttribute('aria-pressed', String(!isPlaying));
      heroToggleButton.setAttribute(
        'aria-label',
        isPlaying ? 'Pause home slideshow' : 'Resume home slideshow'
      );
    }

    function stopTimer() {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    function startTimer() {
      if (slideCount < 2) return;
      stopTimer();
      timerId = window.setInterval(() => {
        renderSlide(currentSlide + 1);
      }, intervalMs);
      isPlaying = true;
      updateToggleButton();
    }

    function pauseTimer() {
      stopTimer();
      isPlaying = false;
      updateToggleButton();
    }

    function jumpToSlide(nextIndex) {
      renderSlide(nextIndex);
      if (isPlaying) startTimer();
    }

    renderSlide(0);
    startTimer();

    heroPrevButton?.addEventListener('click', () => jumpToSlide(currentSlide - 1));
    heroNextButton?.addEventListener('click', () => jumpToSlide(currentSlide + 1));
    heroToggleButton?.addEventListener('click', () => {
      if (isPlaying) {
        pauseTimer();
      } else {
        startTimer();
      }
    });

    updateToggleButton();
  }
}

// Dynamic loading for "Our Gallery" section on Home Page
const homeGalleryGrid = document.getElementById('homeGalleryGrid');
console.log('homeGalleryGrid element:', homeGalleryGrid);
if (homeGalleryGrid) {
  const galleryImages = resolveImageUrls([
    '../assets/images/ourGallary/gallery-img-1.jpg',
    '../assets/images/ourGallary/gallery-img-2.jpg',
    '../assets/images/ourGallary/gallery-img-3.jpg',
    '../assets/images/ourGallary/gallery-img-4.jpg',
    '../assets/images/ourGallary/gallery-img-5.jpg',
    '../assets/images/ourGallary/gallery-img-6.jpg',
    '../assets/images/ourGallary/gallery-img-7.jpg',
    '../assets/images/ourGallary/gallery-img-8.jpg',
    '../assets/images/ourGallary/gallery-img-9.jpg',
    '../assets/images/ourGallary/gallery-img-10.jpg',
    '../assets/images/ourGallary/gallery-img-11.jpg',
    '../assets/images/ourGallary/gallery-img-12.jpg',
    '../assets/images/ourGallary/gallery-img-13.jpg',
    '../assets/images/ourGallary/gallery-img-14.jpg',
    '../assets/images/ourGallary/gallery-img-15.jpg',
    '../assets/images/ourGallary/gallery-img-16.jpg',
    '../assets/images/ourGallary/gallery-img-17.jpg',
    '../assets/images/ourGallary/gallery-img-18.jpg',
    '../assets/images/ourGallary/gallery-img-19.jpg',
    '../assets/images/ourGallary/gallery-img-20.jpg',
    '../assets/images/ourGallary/gallery-img-21.jpg',
    '../assets/images/ourGallary/gallery-img-22.jpg',
    '../assets/images/ourGallary/gallery-img-23.jpg',
    '../assets/images/ourGallary/gallery-img-24.jpg',
    '../assets/images/ourGallary/gallery-img-25.jpg',
    '../assets/images/ourGallary/gallery-img-26.jpg',
    '../assets/images/ourGallary/gallery-img-27.jpg',
    '../assets/images/ourGallary/gallery-img-28.jpg',
    '../assets/images/ourGallary/gallery-img-29.jpg'
  ]).map((src, index) => ({
    src,
    alt: `Gallery image ${index + 1}`
  }));

  console.log('galleryImages count:', galleryImages.length);

  if (galleryImages.length > 0) {
    homeGalleryGrid.innerHTML = '';
    galleryImages.forEach(({ src, alt }) => {
      const img = document.createElement('img');
      img.className = 'gallery-item';
      img.src = src;
      img.alt = alt;
      img.loading = 'lazy';
      homeGalleryGrid.appendChild(img);
    });
    homeGalleryGrid.classList.add('visible');
    console.log('Gallery images appended:', homeGalleryGrid.children.length);
  }
}

// Gallery filtering and lightbox
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.querySelector('.lightbox-close');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;

    galleryItems.forEach(item => {
      const shouldShow = selected === 'all' || item.dataset.category === selected;
      item.style.display = shouldShow ? 'block' : 'none';
    });
  });
});

document.addEventListener('click', event => {
  const item = event.target.closest('.gallery-item');
  if (item) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{8,18}$/.test(phone);
}

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const shootType = formData.get('shootType');
    const message = formData.get('message').trim();

    let error = '';
    if (name.length < 2) error = 'Please enter your full name.';
    else if (!isValidEmail(email)) error = 'Please enter a valid email address.';
    else if (!isValidPhone(phone)) error = 'Please enter a valid phone number.';
    else if (!shootType) error = 'Please select a shoot type.';
    else if (message.length < 10) error = 'Please write a short message with at least 10 characters.';

    if (error) {
      formMessage.textContent = error;
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = 'Thank you! Your enquiry has been received. We will contact you soon.';
    formMessage.className = 'form-message success';
    contactForm.reset();
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(element => revealObserver.observe(element));
