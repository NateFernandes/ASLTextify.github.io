// Get references to the checkbox and the button
const manualCaptureCheckbox = document.getElementById('manual-capture-checkbox');
const captureSignButton = document.getElementById('capture-sign-button');

// Event listener for checkbox toggle
manualCaptureCheckbox.addEventListener('change', () => {
    if (manualCaptureCheckbox.checked) {
        captureSignButton.classList.remove('hidden'); // Show button
    } else {
        captureSignButton.classList.add('hidden'); // Hide button
    }
});
