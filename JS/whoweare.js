document.addEventListener("DOMContentLoaded", function() {
    const section1 = document.querySelector('.whoweare-section1');
    const section2 = document.querySelector('.whoweare-section2');

    function handleScroll() {
        const viewportHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        // If screen width is less than or equal to 1100px, disable animations
        if (screenWidth <= 1100) {
            // Remove any transformations or opacity changes
            section1.style.transform = 'none';
            section1.style.opacity = '1';
            section2.style.transform = 'none';
            section2.style.opacity = '1';
            return; // Exit the function so no animations happen
        }

        // Check section 1
        const section1Rect = section1.getBoundingClientRect();
        if (section1Rect.bottom < 0 || section1Rect.top > viewportHeight) {
            // Completely out of view
            section1.style.transform = 'translateX(100%)';
            section1.style.opacity = '0';
        } else {
            // Calculate visibility based on full height
            const section1Visible = Math.max(0, Math.min(1, (viewportHeight - section1Rect.top) / section1Rect.height));
            section1.style.transform = `translateX(${(1 - section1Visible) * 100}%)`;
            section1.style.opacity = section1Visible;
        }

        // Check section 2
        const section2Rect = section2.getBoundingClientRect();
        if (section2Rect.bottom < 0 || section2Rect.top > viewportHeight) {
            // Completely out of view
            section2.style.transform = 'translateX(-100%)';
            section2.style.opacity = '0';
        } else {
            // Calculate visibility based on full height
            const section2Visible = Math.max(0, Math.min(1, (viewportHeight - section2Rect.top) / section2Rect.height));
            section2.style.transform = `translateX(${(section2Visible - 1) * 100}%)`;
            section2.style.opacity = section2Visible;
        }
    }

    // Initial setup
    section1.style.transform = 'translateX(100%)';
    section1.style.opacity = '0';
    section2.style.transform = 'translateX(-100%)';
    section2.style.opacity = '0';

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on load to set initial state
});
