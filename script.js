// Static website interactions only: mobile navigation and current copyright year.
// No database, shopping cart, admin panel, customer account or backend is used.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


// Desktop gallery hover preview: show a larger floating version of the photo.
const galleryPreview = document.getElementById('galleryPreview');
const galleryPreviewImage = document.getElementById('galleryPreviewImage');
const galleryPreviewCaption = document.getElementById('galleryPreviewCaption');
const canHoverGallery = window.matchMedia('(hover: hover) and (pointer: fine)');

if (galleryPreview && galleryPreviewImage && galleryPreviewCaption && canHoverGallery.matches) {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    const photo = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay strong');
    if (!photo) return;
    item.addEventListener('mouseenter', () => {
      galleryPreviewImage.src = photo.currentSrc || photo.src;
      galleryPreviewImage.alt = photo.alt || 'Jewellery gallery preview';
      galleryPreviewCaption.textContent = title ? title.textContent.trim() : photo.alt;
      galleryPreview.classList.add('is-visible');
      galleryPreview.setAttribute('aria-hidden', 'false');
    });
    item.addEventListener('mousemove', (event) => {
      const gap = 18, width = 250, height = 290;
      let left = event.clientX + gap; let top = event.clientY + gap;
      if (left + width > window.innerWidth - 8) left = event.clientX - width - gap;
      if (top + height > window.innerHeight - 8) top = window.innerHeight - height - 8;
      if (top < 8) top = 8;
      galleryPreview.style.left = `${Math.max(8, left)}px`;
      galleryPreview.style.top = `${top}px`;
    });
    item.addEventListener('mouseleave', () => {
      galleryPreview.classList.remove('is-visible');
      galleryPreview.setAttribute('aria-hidden', 'true');
    });
  });
}






// Automatic Home background image slideshow
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".hero-slide");

  if (slides.length < 2) return;

  let currentSlide = 0;

  setInterval(function () {
    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");
  }, 5000);
});