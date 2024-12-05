document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.carousel-slides');
    const slideCount = document.querySelectorAll('.carousel-slide').length;
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;

    // Pulse animation function
    const triggerPulse = (index) => {
        const circularGraphic = document.querySelector('.circular-graphic');
        if (index === 0) {  // Assuming slide 1 has the circular graphic
            circularGraphic.classList.add('pulse');
        } else {
            circularGraphic.classList.remove('pulse');
        }
    };

    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index, direction) => {
        if (isAnimating) return;
        isAnimating = true;
        const prevIndex = currentIndex;
        currentIndex = (index + slideCount) % slideCount;

        // Remove swipe direction classes from all slides
        document.querySelectorAll('.carousel-slide').forEach((slide, i) => {
            slide.classList.remove('left-swipe', 'right-swipe', 'middle-swipe');
            slide.classList.toggle('active', i === currentIndex);
            if (i === currentIndex) {
                slide.classList.add(direction ? direction : 'middle-swipe');
            }
        });

        // Handle pulse animation on Slide 1 (adjust index based on where the graphic is)
        triggerPulse(currentIndex);

        // Handle fade-in effect for the image in Slide 2
        if (prevIndex === 1 || currentIndex === 1) {
            const imageDiv = document.querySelector('.slide-two-image');
            imageDiv.style.opacity = (currentIndex === 1) ? '1' : '0';
        }

        slides.style.transform = `translateX(-${currentIndex * 100}%)`;

        updateIndicators();
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1, 'left-swipe');
        }, 6000); // 6 seconds interval
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    document.querySelector('.left-arrow').addEventListener('click', () => {
        goToSlide(currentIndex - 1, 'right-swipe');
        resetAutoSlide();
    });

    document.querySelector('.right-arrow').addEventListener('click', () => {
        goToSlide(currentIndex + 1, 'left-swipe');
        resetAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index, 'middle-swipe');
            resetAutoSlide();
        });
    });

    document.querySelector('.carousel-container').addEventListener('click', (e) => {
        const containerWidth = e.currentTarget.offsetWidth;
        const clickPosition = e.clientX - e.currentTarget.getBoundingClientRect().left;

        if (clickPosition < containerWidth / 2) {
            goToSlide(currentIndex - 1, 'right-swipe');
        } else {
            goToSlide(currentIndex + 1, 'left-swipe');
        }
        resetAutoSlide();
    });

    // Stop slide change when clicking CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Ensure Slide 1 is visible initially and trigger pulse on load
    document.querySelectorAll('.carousel-slide')[0].classList.add('active');
    triggerPulse(0);

    setTimeout(() => {
        document.querySelectorAll('.carousel-slide').forEach(slide => {
            slide.classList.remove('initial-hidden');
        });
    }, 100); 

    startAutoSlide();
});

// Example: Recalculate slide widths on resize
window.addEventListener('resize', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const slideWidth = document.querySelector('.carousel-container').offsetWidth;
    
    slides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
    });
});
