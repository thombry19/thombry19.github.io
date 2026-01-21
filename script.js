function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
  items.forEach((item,i)=>item.classList.remove('active'));
  items[currentIndex].classList.add('active');

  const trackWidth = track.offsetWidth;
  const itemWidth = items[currentIndex].offsetWidth;
  const offset = trackWidth/2 - itemWidth/2 - items[currentIndex].offsetLeft;

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
setInterval(nextImage, 4000);

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

// click outside to close
document.getElementById('lightbox').addEventListener('click', e=>{
  if(e.target===e.currentTarget) closeLightbox();
});
