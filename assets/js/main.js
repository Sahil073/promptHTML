document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.services-track');
  if (track) {
    const items = document.querySelectorAll('.service-box');
    const prevBtn = document.getElementById('prevService');
    const nextBtn = document.getElementById('nextService');

    let index = 0;
    let itemWidth = items[0].offsetWidth + 20;

    const firstClone = items[0].cloneNode(true);
    const secondClone = items[1].cloneNode(true);
    const lastClone = items[items.length-1].cloneNode(true);
    const secondLastClone = items[items.length-2].cloneNode(true);

    track.appendChild(firstClone);
    track.appendChild(secondClone);
    track.insertBefore(lastClone, items[0]);
    track.insertBefore(secondLastClone, items[0]);

    const allItems = document.querySelectorAll('.service-box');

    index = 2;
    track.style.transform = `translateX(-${index * itemWidth}px)`;

    function getVisibleCount() {
      if(window.innerWidth >= 992) return 3;
      if(window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateCarousel() {
      itemWidth = allItems[0].offsetWidth + 20;
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function next() {
      index++;
      updateCarousel();
      const visible = getVisibleCount();
      setTimeout(() => {
        if(index >= allItems.length - visible) {
          track.style.transition = 'none';
          index = 2;
          track.style.transform = `translateX(-${index * itemWidth}px)`;
        }
      }, 500);
    }

    function prev() {
      index--;
      updateCarousel();
      const visible = getVisibleCount();
      setTimeout(() => {
        if(index < 2) {
          track.style.transition = 'none';
          index = allItems.length - visible - 2;
          track.style.transform = `translateX(-${index * itemWidth}px)`;
        }
      }, 500);
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);
      setInterval(next, 3000);
    }

    window.addEventListener('resize', updateCarousel);
  }

  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
// ===== Disable Right-Click =====
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  alert("Right-click is disabled!");
});

// ===== Disable Key Shortcuts =====
document.addEventListener('keydown', function(e) {
  // F12
  if (e.key === 'F12') e.preventDefault();

  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) e.preventDefault();

  // Ctrl+U (View Source)
  if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault();

  // Ctrl+S (Save)
  if (e.ctrlKey && e.key.toUpperCase() === 'S') e.preventDefault();
});

// ===== Detect DevTools Open =====
let devtoolsOpen = false;
const threshold = 160; // minimal difference for detection

setInterval(function() {
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  if(widthThreshold || heightThreshold){
    if(!devtoolsOpen){
      devtoolsOpen = true;
      alert("DevTools detected!"); // You can redirect or log
      // window.location.href = "about:blank"; // optional redirect
    }
  } else {
    devtoolsOpen = false;
  }
}, 1000);

// ===== Anti Console Log / Debugger Detection =====
(function() {
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      alert('DevTools detected via console!');
      // window.location.href = "about:blank"; // optional redirect
    }
  });
  console.log(element);
})();