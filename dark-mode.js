// Select the toggle button
const toggleButton = document.getElementById('dark-mode-toggle');
const toggleIcon = toggleButton.querySelector('img');

// Select the ASL Textify logo
const aslLogo = document.querySelector('.navbar-left img');

// Select the Vertex Technologies image
const vertexImage = document.querySelector('.contact-right img');

// Function to update the logo based on dark mode state
function updateLogo() {
    if (document.body.classList.contains('dark-mode')) {
        aslLogo.src = 'Images/asltextify-white.png';  // Image for dark mode
        aslLogo.alt = 'ASL Textify White Logo';
        vertexImage.src = 'Images/Vertex_Technologies-transparent.png';  // Image for dark mode
        vertexImage.alt = 'Vertex Technologies Dark Mode';
    } else {
        aslLogo.src = 'Images/asltextify-black.png';  // Image for light mode
        aslLogo.alt = 'ASL Textify Black Logo';
        vertexImage.src = 'Images/Vertex_Technologies-transparent-black.png';  // Image for light mode
        vertexImage.alt = 'Vertex Technologies Light Mode';
    }
}

// Update the logo when the page loads, based on dark mode
document.addEventListener('DOMContentLoaded', () => {
    // Check if dark mode is already active (e.g., if you save the state in localStorage)
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Update the logos according to the initial state
    updateLogo();
});

// Add an event listener to toggle dark mode when clicked
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the dark mode state in localStorage for future visits
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);

    // Update the logo when dark mode is toggled
    updateLogo();
});
