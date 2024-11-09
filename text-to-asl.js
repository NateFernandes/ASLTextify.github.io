document.getElementById('translate-button').addEventListener('click', function() {
    console.log("Button clicked! Starting translation...");
    translateToASL();
});

function translateToASL() {
    const inputText = document.getElementById('input-text').value.trim().toUpperCase();
    const outputContainer = document.getElementById('output-translation');
    outputContainer.innerHTML = ''; // Clear previous translations

    if (inputText.length === 0) {
        outputContainer.innerHTML = '<p>Please enter some text to translate.</p>';
        return;
    }

    const words = inputText.split(' '); // Split the input by spaces to get words

    words.forEach(word => {
        const wordContainer = document.createElement('div');
        wordContainer.className = 'word-container';

        const wordText = document.createElement('span');
        wordText.innerText = word; // Display the word in text
        wordContainer.appendChild(wordText); // Add word text to container

        // Loop through each letter in the word and add corresponding ASL images
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (/[A-Z]/.test(char)) { // Ensure it's a valid letter
                const img = document.createElement('img');
                img.src = `Images/${char}.png`;
                img.alt = `ASL ${char}`;
                img.width = 50; // Adjust size if needed
                img.onerror = function() {
                    this.src = 'Images/placeholder.png'; // Fallback for missing images
                };
                wordContainer.appendChild(img); // Add each image to the word container
            }
        }

        // Add the word container to the output container with a line break
        outputContainer.appendChild(wordContainer);
        
        // Add a line break after each word to move the next word to a new line
        const lineBreak = document.createElement('br');
        outputContainer.appendChild(lineBreak);
    });
}


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
