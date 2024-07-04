let startX, startY, endX, endY;

document.addEventListener("touchstart", function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.addEventListener("touchmove", function(event) {
  endX = event.touches[0].clientX;
  endY = event.touches[0].clientY;
});

document.addEventListener("touchend", function(event) {
  const diffX = endX - startX;
  const diffY = endY - startY;

  // Check if the swipe is horizontal and long enough
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe right
      navigate(-1);
    } else {
      // Swipe left
      navigate(1);
    }
  }
});

function navigate(direction) {
  let currentIndex;

  // Find the currently active page
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].classList.contains("active")) {
      currentIndex = i;
      break;
    }
  }

  // Calculate the new index
  const newIndex = (currentIndex + direction + pages.length) % pages.length;

  // Remove active class from all pages and navigation links
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.remove("active");
    navigationLinks[i].classList.remove("active");
  }

  // Add active class to the new page and corresponding navigation link
  pages[newIndex].classList.add("active");
  navigationLinks[newIndex].classList.add("active");

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}
