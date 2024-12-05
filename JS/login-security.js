let currentPassword = 'ASLTextify123'; // Initial password, can be updated after successful change
let passwordStrength = {
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong'
};

// Toggle password update section
function togglePasswordUpdate() {
    const updateForm = document.querySelector('.password-update-form');
    const updateButton = document.querySelector('.update-btn');
    const submitButton = document.querySelector('.submit-btn');
    const cancelButton = document.querySelector('.cancel-btn');

    if (updateForm.classList.contains('hidden')) {
        updateForm.classList.remove('hidden');
        updateButton.classList.add('hidden');
        cancelButton.classList.remove('hidden');
        submitButton.classList.remove('hidden');
    } else {
        cancelUpdate();
    }
}

// Check current password only when updating
function isCurrentPasswordCorrect() {
    const enteredPassword = document.getElementById('current-password').value;
    return enteredPassword === currentPassword;
}

// Check password strength and update the color and message
function checkPasswordStrength() {
    const newPassword = document.getElementById('new-password').value;
    const strengthIndicator = document.getElementById('password-strength');

    let strength = passwordStrength.weak; // Default to weak
    let color = 'red'; // Default color for weak

    // Check for Weak: at least 6 characters
    if (newPassword.length >= 6) {
        strength = passwordStrength.weak; // Set to weak
        color = 'red'; // Color for weak
    }

    // Check for Fair: at least 8 characters, 1 lower-case, 1 upper-case, and 1 number
    if (
        newPassword.length >= 8 &&
        /[a-z]/.test(newPassword) && // At least one lower-case
        /[A-Z]/.test(newPassword) && // At least one upper-case
        /[0-9]/.test(newPassword) // At least one number
    ) {
        strength = passwordStrength.fair; // Set to fair
        color = 'orange'; // Color for fair
    }

    // Check for Strong: at least 8 characters and at least 1 special character in addition to Fair criteria
    if (
        newPassword.length >= 8 &&
        /[a-z]/.test(newPassword) && // At least one lower-case
        /[A-Z]/.test(newPassword) && // At least one upper-case
        /[0-9]/.test(newPassword) && // At least one number
        /[!@#$%^&*]/.test(newPassword) // At least one special character
    ) {
        strength = passwordStrength.strong; // Set to strong
        color = 'green'; // Color for strong
    }

    // Only show the indicator if there's a password being typed
    if (newPassword) {
        strengthIndicator.style.display = 'block';
        strengthIndicator.innerText = `Password Strength: ${strength}`;
        strengthIndicator.style.color = color;
    } else {
        // Hide the indicator when there's no input
        strengthIndicator.style.display = 'none';
    }

    return strength;
}

// Update password only if conditions are met
function updatePassword() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Only check current password here
    if (!isCurrentPasswordCorrect()) {
        alert('Wrong Password');
        return;
    }

    // Check if new passwords match and meet strength requirements
    const passwordStrengthLevel = checkPasswordStrength();
    if (newPassword === '' || confirmPassword === '') {
        alert("Please fill out all password fields.");
        return;
    }
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    if (passwordStrengthLevel === passwordStrength.weak) {
        alert("Password must be Fair or Strong to be updated.");
        return;
    }

    // All checks passed, update the password
    currentPassword = newPassword; // Updates the global password variable
    alert("Password updated successfully!");

    // Clear form fields and reset UI
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    cancelUpdate();
}

// Cancel update and hide all password fields
function cancelUpdate() {
    const updateForm = document.querySelector('.password-update-form');
    const updateButton = document.querySelector('.update-btn');
    const submitButton = document.querySelector('.submit-btn');
    const cancelButton = document.querySelector('.cancel-btn');
    const strengthIndicator = document.getElementById('password-strength'); // Get the strength indicator

    updateForm.classList.add('hidden');
    updateButton.classList.remove('hidden');
    submitButton.classList.add('hidden');
    cancelButton.classList.add('hidden');

    // Hide the strength indicator
    strengthIndicator.style.display = 'none'; // Reset strength indicator
}

// Account deactivation confirmation
function deactivateAccount() {
    if (confirm("Are you sure you want to deactivate your account?")) {
        alert("Account deactivated.");
    }
}
