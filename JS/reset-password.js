function checkPasswordStrength() {
    const passwordInput = document.getElementById('new_password');
    const password = passwordInput.value; // Correct ID
    const strengthIndicator = document.getElementById('password-strength');

    // Default to weak
    let strength = 'Weak';
    let color = 'red';

    // Check for Fair: At least 8 characters, 1 lowercase, 1 uppercase, 1 number
    if (
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password)
    ) {
        strength = 'Fair';
        color = 'orange';
    }

    // Check for Strong: Same as Fair + at least 1 special character
    if (
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*]/.test(password)
    ) {
        strength = 'Strong';
        color = 'green';
    }

    // Display the strength indicator
    const isPasswordEmpty = !password.trim();
    if (!isPasswordEmpty) {
        strengthIndicator.style.display = 'block';
        strengthIndicator.innerText = `Password Strength: ${strength}`;
        strengthIndicator.style.color = color;
    } else {
        // Hide the indicator when there's no input
        strengthIndicator.style.display = 'none';
    }

    // Update visibility icon position dynamically
    const inputBox = passwordInput.closest('.input-box');
    if (!isPasswordEmpty) {
        inputBox.classList.add('input-filled'); // Add class when input has content
    } else {
        inputBox.classList.remove('input-filled'); // Remove class when input is empty
    }

    // Return strength for validation
    return strength;
}

// Prevent form submission if password is weak
document.querySelector('form').addEventListener('submit', function (event) {
    const strength = checkPasswordStrength();
    if (strength === 'Weak') {
        event.preventDefault(); // Prevent form submission
        alert('Your password is too weak. Please choose a stronger password.');
    }
});

// Update visibility icon position dynamically when typing
document.getElementById('password').addEventListener('input', function () {
    checkPasswordStrength(); // Reuse the function to handle password strength and visibility logic
});

function toggleVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);

    // Read icon paths from data attributes
    const visibleIcon = toggleIcon.getAttribute('data-visible-icon');
    const hiddenIcon = toggleIcon.getAttribute('data-hidden-icon');

    // Toggle password visibility
    if (input.type === "password") {
        input.type = "text";
        toggleIcon.src = visibleIcon;  // Switch to visibility-on icon
    } else {
        input.type = "password";
        toggleIcon.src = hiddenIcon; // Switch to visibility-off icon
    }
}
