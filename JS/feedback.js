function submitFeedback() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const feedback = document.getElementById('feedback').value.trim();
    const messageBox = document.getElementById('message');
    
    if (rating) {
        const starValue = rating.value;
        const reviewText = `Rated ${starValue} stars. ${feedback}`;
        const reviewLink = `https://g.page/r/CdkOQz0zFvI4EAI/review?pli=1`;

        // Clear any previous error message
        messageBox.style.display = 'none';

        // Confirm before redirecting
        const confirmation = confirm("You will be redirected to Google Reviews to submit your feedback. Your review text has been copied to the clipboard. Please paste it into the review box on the new tab.");
        
        if (confirmation) {
            // Copy review text to clipboard
            navigator.clipboard.writeText(reviewText).then(() => {
                // Open the Google Reviews page in a new tab
                window.open(reviewLink, '_blank');
            }).catch(err => {
                messageBox.innerText = 'Failed to copy review text.';
                messageBox.style.display = 'block';
            });
        }
    } else {
        messageBox.innerText = 'Please select a rating.';
        messageBox.style.display = 'block';
    }
}

// Remove error message when a star is selected
document.getElementById('stars').addEventListener('change', function() {
    const messageBox = document.getElementById('message');
    messageBox.style.display = 'none';
});
