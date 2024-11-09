// Overlay and enlarged card functionality
const testimonialCards = document.querySelectorAll('.testimonial-card');
const overlay = document.getElementById('overlay');
const enlargedCard = document.getElementById('enlargedCard');

testimonialCards.forEach(card => {
    card.addEventListener('click', () => {
        enlargedCard.innerHTML = card.innerHTML; // Copy content to enlarged view
        overlay.style.display = 'flex'; // Show the overlay with enlarged card
    });
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});
