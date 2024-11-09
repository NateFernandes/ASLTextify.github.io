const carousel = document.querySelector('.carousel');
let currentIndex = 0;  // Start at the first slide
const totalSlides = document.querySelectorAll('.slide').length;
const lines = document.querySelectorAll('.line');
const slides = document.querySelectorAll('.slide');
let slideInterval;  // To store the interval ID

// Set the first slide and first nav line as active on page load
window.onload = function() {
    updateCarousel();
    updateLines();
    startAutoSlide();  // Start the auto slide when page loads
};

function showNextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    moveToSlide(nextIndex);
}

function moveToSlide(index) {
    const isJumpingBetweenNonConsecutiveSlides = Math.abs(currentIndex - index) > 1;

    if (isJumpingBetweenNonConsecutiveSlides) {
        hideInBetweenSlides(currentIndex, index);
    }

    currentIndex = index;
    updateCarousel();

    resetAutoSlide();  // Reset the auto slide timer when manually switching
}

function updateCarousel() {
    // Enable transition for smooth swiping
    carousel.style.transition = 'transform 0.5s ease';

    // Move to the desired slide
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    updateLines();
    setTimeout(() => showAllSlides(), 500);  // Ensure all slides are visible after the transition
}

function updateLines() {
    lines.forEach(line => line.classList.remove('active'));
    lines[currentIndex].classList.add('active');
}

// Hide the in-between slides when jumping between non-consecutive slides
function hideInBetweenSlides(fromIndex, toIndex) {
    slides.forEach((slide, index) => {
        if ((index > Math.min(fromIndex, toIndex)) && (index < Math.max(fromIndex, toIndex))) {
            slide.style.visibility = 'hidden';  // Hide the in-between slide
        }
    });
}

// Make sure all slides are visible after the jump is done
function showAllSlides() {
    slides.forEach(slide => {
        slide.style.visibility = 'visible';  // Make sure all slides are visible again
    });
}

// Auto switch slides every 3 seconds
function startAutoSlide() {
    slideInterval = setInterval(showNextSlide, 3000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);  // Clear the existing interval
    startAutoSlide();  // Start it again fresh
}
