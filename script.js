// Hamburger menu toggle
function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Carousel setup
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
  items.forEach((item, i) => {
    item.classList.remove('active', 'close');

    const distance = Math.abs(i - currentIndex);

    if (distance === 0) {
      item.classList.add('active');
    } else if (distance === 1) {
      item.classList.add('close');
    }
    // distance >= 2 → invisible
  });

  const trackWidth = track.offsetWidth;
  const itemWidth = items[currentIndex].offsetWidth;
  const offset =
    trackWidth / 2 -
    itemWidth / 2 -
    items[currentIndex].offsetLeft;

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

updateCarousel();
let autoplayTimer = null;
let resumeTimer = null;
const AUTOPLAY_DELAY = 4000;
const COOLDOWN_TIME = 10000;

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(nextImage, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function pauseAutoplayWithCooldown() {
  stopAutoplay();

  if (resumeTimer) {
    clearTimeout(resumeTimer);
  }

  resumeTimer = setTimeout(() => {
    startAutoplay();
  }, COOLDOWN_TIME);
}

// Lightbox
function openLightbox(img){
  const lb=document.getElementById('lightbox');
  const lbImg=lb.querySelector('img');
  const desc=document.getElementById('lightbox-desc');
  const link=document.getElementById('lightbox-link');

  lbImg.src = img.src;
  lbImg.alt = img.alt;
  desc.textContent = img.nextElementSibling?.querySelector('p')?.textContent || '';
  const aTag = img.nextElementSibling?.querySelector('a');
  link.href = aTag ? aTag.href : '#';
  link.style.display = aTag ? 'inline-block' : 'none';

  lb.style.display='flex';
  document.querySelector('.menu-button').style.pointerEvents='none';
}

function closeLightbox(){
  document.getElementById('lightbox').style.display='none';
  document.querySelector('.menu-button').style.pointerEvents='auto';
}

// click outside to close lightbox
document.getElementById('lightbox').addEventListener('click', e=>{
  if(e.target===e.currentTarget) closeLightbox();
});

let startX = 0;

track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prevImage();
  if (startX - endX > 50) nextImage();
});
