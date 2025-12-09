// Simple JavaScript for any interactive features
// Currently, most interactions are handled by CSS (hover effects)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Image error handling (fallback for broken images)
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // You can add a fallback image here if needed
    console.log('Image failed to load:', this.src);
  });
});

