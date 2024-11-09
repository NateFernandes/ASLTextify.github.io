// Function to check if an element is in the viewport (for mobile)
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && 
        rect.bottom > 0
    );
}

// Function to add the 'show' class on scroll for mobile
function revealCardsOnScroll() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        if (isElementInView(card)) {
            card.classList.add('show');
        }
    });
}

// Function to handle desktop animation immediately on load
function showCardsImmediately() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.add('show'); // Show all cards immediately
    });
}

// Detect screen size and apply respective animation logic
function applyAnimationBasedOnScreen() {
    if (window.innerWidth < 768) {
        // Mobile: Add scroll event listener for mobile view
        window.addEventListener('scroll', revealCardsOnScroll);
        revealCardsOnScroll(); // Run once in case some elements are already in view
    } else {
        // Desktop: Show cards immediately when page loads
        showCardsImmediately();
    }
}

// Listen to page load and resize events
document.addEventListener('DOMContentLoaded', applyAnimationBasedOnScreen);
window.addEventListener('resize', applyAnimationBasedOnScreen);
