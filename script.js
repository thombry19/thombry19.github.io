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

function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('img');
  const desc = document.getElementById('lightbox-desc');
  const link = document.getElementById('lightbox-link');

  lbImg.src = img.src;
  desc.textContent = img.nextElementSibling?.querySelector('p')?.textContent || '';
  const aTag = img.nextElementSibling?.querySelector('a');
  link.href = aTag ? aTag.href : '#';
  link.style.display = aTag ? 'inline-block' : 'none';

  lightbox.style.display = 'flex';

  // disable menu while lightbox is open
  document.querySelector('.menu-button').style.pointerEvents = 'none';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.querySelector('.menu-button').style.pointerEvents = 'auto';
}

// close when clicking outside content
document.getElementById('lightbox').addEventListener('click', function(e){
  if(e.target === this){
    closeLightbox();
  }
});
