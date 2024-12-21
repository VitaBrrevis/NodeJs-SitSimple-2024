document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel-inner');
  const items = carousel.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;

  function showItems(index) {
    const visibleItems = 2;
    items.forEach((item, i) => {
      item.style.display = (i >= index && i < index + visibleItems) ? 'block' : 'none';
    });
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItems(currentIndex);
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItems(currentIndex);
  }

  document.querySelector('.carousel-next').addEventListener('click', nextItem);
  document.querySelector('.carousel-prev').addEventListener('click', prevItem);

  showItems(currentIndex);
});