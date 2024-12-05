// Prevent duplicate submissions
let isSubmitting = false;

// Event listener for the translate button
document.getElementById('translate-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission if inside a form
    console.log("Button clicked! Starting translation...");
    translateToASL();
});

function translateToASL() {
    let inputText = document.getElementById('input-text').value
        .trim()
        .toUpperCase()
        .replace(/[\r\n]+/g, ' '); // Replace line breaks with spaces

    const outputContainer = document.getElementById('output-translation');
    outputContainer.innerHTML = ''; // Clear previous translations

    if (inputText.length === 0) {
        outputContainer.innerHTML = '<p>Please enter some text to translate.</p>';
        return;
    }

    // Split input text by spaces, filter out empty strings
    const words = inputText.split(' ').filter(word => word.trim() !== '');

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
                img.src = `Images/signs/${char}.png`;
                img.alt = `ASL ${char}`;
                img.width = 50; // Adjust size if needed
                img.onerror = function () {
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

    // Save the translation to the database
    saveTranslationToDatabase(inputText);
}

function saveTranslationToDatabase(inputText) {
    if (isSubmitting) {
        console.log("A request is already in progress. Please wait.");
        return; // Skip if already submitting
    }

    isSubmitting = true; // Set the flag to indicate submission in progress

    fetch('/text-to-asl.html', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
    })
        .then(response => response.json())
        .then(data => {
            isSubmitting = false; // Reset flag on success
            if (data.error) {
                console.error("Error saving translation:", data.error);
            } else {
                console.log(`Translation saved successfully at ${data.timestamp}`);
            }
        })
        .catch(error => {
            isSubmitting = false; // Reset flag on error
            console.error("Error:", error);
        });
}
