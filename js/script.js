document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const cardInner = document.querySelector('.card-inner');
    let isFlipping = false;

    // Handle click to flip
    card.addEventListener('click', () => {
        if (!isFlipping) {
            isFlipping = true;
            card.classList.toggle('flipped');
            
            // Reset the flipping flag after animation completes
            setTimeout(() => {
                isFlipping = false;
            }, 800);
        }
    });

    // Add hover effect for desktop
    if (window.matchMedia("(min-width: 768px)").matches) {
        card.addEventListener('mousemove', (e) => {
            if (!card.classList.contains('flipped')) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = -(x - centerX) / 25;
                
                // Only apply hover effect if card is not flipped
                if (!card.classList.contains('flipped')) {
                    cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform if card is not flipped
            if (!card.classList.contains('flipped')) {
                cardInner.style.transform = '';
            } else {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        });
    }

    // Add touch functionality for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    card.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    });

    card.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const deltaTime = touchEndTime - touchStartTime;
        
        // Only flip if it's a quick tap (less than 200ms) and minimal movement
        if (deltaTime < 200 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            if (!isFlipping) {
                isFlipping = true;
                card.classList.toggle('flipped');
                
                setTimeout(() => {
                    isFlipping = false;
                }, 800);
            }
        }
    });
}); 