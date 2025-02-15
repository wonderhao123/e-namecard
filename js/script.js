const card = document.querySelector('.card');
let touchStartX = 0;
let touchEndX = 0;

// Click handler
card.addEventListener('click', function(e) {
    // Prevent flip on social links click
    if (e.target.closest('.social-icon') || e.target.closest('.contact-item')) {
        return;
    }
    this.classList.toggle('flipped');
});

// Touch handlers
card.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

card.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (
            (swipeDistance > 0 && !card.classList.contains('flipped')) || 
            (swipeDistance < 0 && card.classList.contains('flipped'))
        ) {
            card.classList.toggle('flipped');
        }
    }
}

// Prevent default touch behavior to avoid scrolling issues
card.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false }); 