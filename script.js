function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.remove('active');
  });
  items[currentIndex].classList.add('active');

  const trackWidth = track.offsetWidth;
  const itemWidth = items[currentIndex].offsetWidth;
  const offset = trackWidth / 2 - itemWidth / 2 - items[currentIndex].offsetLeft;

  track.style.transform = `translateX(${offset}px)`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
}

// Initialize
updateCarousel();

// Optional: Auto-scroll
let autoScroll = setInterval(nextImage, 4000);

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxLink = document.getElementById('lightbox-link');

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const desc = item.querySelector('.carousel-desc p').innerText;
    const link = item.querySelector('.carousel-desc a')?.href || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxDesc.innerText = desc;
    lightboxLink.href = link;

    lightbox.style.display = 'flex';
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
}
