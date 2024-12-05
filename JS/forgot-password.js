// Get references to elements
const signinSection = document.getElementById('signin-section');
const forgotPasswordSection = document.getElementById('forgot-password-section');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToSigninLink = document.getElementById('back-to-signin-link');

// Helper function to switch forms with swipe effect
function switchForm(hideSection, showSection) {
    // Swipe-out to the left
    hideSection.classList.add('swipe-out-down');
    hideSection.classList.remove('swipe-in-up');  // Remove any previous swipe-in

    // Wait for the fade-out transition to finish
    setTimeout(() => {
        hideSection.classList.add('hidden'); // Hide the section
        hideSection.classList.remove('swipe-out-down'); // Clean up after swipe-out

        // Show the new section
        showSection.classList.remove('hidden');  // Make it visible
        showSection.classList.add('swipe-in-up');  // Apply swipe-in effect

        setTimeout(() => {
            showSection.classList.remove('swipe-in-up');  // Clean after swipe-in
        }, 400);  // Match the transition time
    }, 400);  // Duration of the swipe-out
}

// Event listeners for the links
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(signinSection, forgotPasswordSection);
});

backToSigninLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForm(forgotPasswordSection, signinSection);
});
