let touchStartX, touchStartY, touchEndX, touchEndY;
  const swipeThreshold = 50; // Minimum swipe distance threshold in pixels
  const swipeTimeThreshold = 300; // Maximum time allowed to swipe in milliseconds
  let swipeStartTime;

  const pages = document.querySelectorAll('.page');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');

  document.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    swipeStartTime = new Date().getTime(); // Record start time of touch
  });

  document.addEventListener("touchmove", function(event) {
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;

    // Show/hide arrows based on swipe direction
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          leftArrow.style.display = "block";
          rightArrow.style.display = "none";
        } else {
          leftArrow.style.display = "none";
          rightArrow.style.display = "block";
        }
      } else {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
      }
    }
  });

  document.addEventListener("touchend", function(event) {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = new Date().getTime() - swipeStartTime;

      if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaY) < Math.abs(deltaX)) {
        // Horizontal swipe detected
        if (deltaX > 0) {
          // Swipe right
          navigatePrevious();
        } else {
          // Swipe left
          navigateNext();
        }
      }
    }
    // Reset touch coordinates
    touchStartX = touchStartY = touchEndX = touchEndY = null;

    // Hide arrows after swipe
    leftArrow.style.display = "none";
    rightArrow.style.display = "none";
  });

  function navigateNext() {
    const activePageIndex = getActivePageIndex();
    const nextPageIndex = (activePageIndex + 1) % pages.length;

    goToPage(nextPageIndex);
  }

  function navigatePrevious() {
    const activePageIndex = getActivePageIndex();
    const previousPageIndex = (activePageIndex - 1 + pages.length) % pages.length;

    goToPage(previousPageIndex);
  }

  function getActivePageIndex() {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].classList.contains("active")) {
        return i;
      }
    }
    return -1;
  }

  function goToPage(index) {
    // Remove active class from all pages
    pages.forEach(page => page.classList.remove("active"));

    // Add active class to the new page
    pages[index].classList.add("active");
  }