// Select the toggle button
const toggleButton = document.getElementById('dark-mode-toggle');
const toggleIcon = toggleButton.querySelector('img');

// Select the Vertex Technologies image
const vertexImage = document.querySelector('.contact-right img');

const aslLogo = document.querySelector('.navbar-left img'); 

// Add an event listener to toggle dark mode when clicked
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        aslLogo.src = 'Images/asltextify-white.png';  // Image for dark mode
        aslLogo.alt = 'ASL Textify White Logo';
    } else {
        aslLogo.src = 'Images/asltextify-black.png';  // Image for light mode
        aslLogo.alt = 'ASL Textify Black Logo';
    }

    // Select the Vertex Technologies image (if needed)
    const vertexImage = document.querySelector('.contact-right img');
    
    // Check if dark mode is active and change the Vertex Technologies image
    if (document.body.classList.contains('dark-mode')) {
        vertexImage.src = 'Images/Vertex_Technologies-transparent.png';  // Image for dark mode
        vertexImage.alt = 'Vertex Technologies Dark Mode';
    } else {
        vertexImage.src = 'Images/Vertex_Technologies-transparent-black.png';  // Image for light mode
        vertexImage.alt = 'Vertex Technologies Light Mode';
    }
});


// About page dark mode