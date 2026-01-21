function toggleMenu() {
  const menu = document.getElementById("dropdown-menu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
let centerIndex = 1; // index of center image
let autoScrollInterval;
let autoScrollSpeed = 3000; // 3 seconds

function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.remove('center');
    if (index === centerIndex) item.classList.add('center');
  });

  const offset = centerIndex - 1; // so 3 images show
  const percent = -(offset * 33.333); // each item 33%
  track.style.transform = `translateX(${percent}%)`;
}

function nextImage() {
  centerIndex = (centerIndex + 1) % items.length;
  updateCarousel();
  resetAutoScroll();
}

function prevImage() {
  centerIndex = (centerIndex - 1 + items.length) % items.length;
  updateCarousel();
  resetAutoScroll();
}

// Auto-scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(nextImage, autoScrollSpeed);
}

function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  setTimeout(startAutoScroll, autoScrollSpeed);
}

// Initialize
updateCarousel();
startAutoScroll();
