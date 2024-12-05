// Load translations dynamically passed from the Flask backend
function displayHistory() {
    const textToAslContainer = document.getElementById('history-container');
    const aslToTextContainer = document.getElementById('asl-to-text-history-container');
    
    // Clear existing entries
    textToAslContainer.innerHTML = '';
    aslToTextContainer.innerHTML = '';

    // Use the dynamically loaded `translationHistory` array
    translationHistory.forEach((entry, index) => {
        if (!entry.text) {
            console.warn(`Skipping invalid entry at index ${index}:`, entry);
            return; // Skip invalid entries
        }

        const item = document.createElement('div');
        item.classList.add('translation-item');

        // Text
        const textElement = document.createElement('div');
        textElement.classList.add('translation-text');
        textElement.innerText = entry.text; 

        // Gestures
        const gestureContainer = createASLFromText(entry.text); 

        // Timestamp
        const timestampElement = document.createElement('div');
        timestampElement.classList.add('timestamp');
        timestampElement.innerText = entry.timestamp;

        item.appendChild(textElement);
        item.appendChild(gestureContainer);
        item.appendChild(timestampElement);

        item.addEventListener('click', () => openModal(entry));

        // Check translation type and append to the correct container
        if (entry.type === 'text-to-asl') {
            textToAslContainer.appendChild(item);
        } else if (entry.type === 'asl-to-text') {
            aslToTextContainer.appendChild(item);
        }
    });
}


window.onload = () => {
    displayASLToTextHistory();
};

// Create ASL gestures from text
function createASLFromText(text) {
    const container = document.createElement('div');
    container.classList.add('gesture-display');

    const words = text.split(' ');

    words.forEach(word => {
        const wordBox = document.createElement('div');
        wordBox.classList.add('word-box');

        const wordLabel = document.createElement('div');
        wordLabel.innerText = word;
        wordLabel.style.fontWeight = 'bold';
        wordLabel.style.marginBottom = '5px';
        wordBox.appendChild(wordLabel);

        // Loop through each letter and add its ASL image
        [...word.toUpperCase()].forEach(letter => {
            if (/[A-Z]/.test(letter)) {
                const img = document.createElement('img');
                img.src = `Images/signs/${letter}.png`;
                img.alt = `ASL ${letter}`;
                img.style.margin = '2px';
                wordBox.appendChild(img);
            }
        });

        container.appendChild(wordBox);
    });

    return container;
}

// Open modal
function openModal(entry) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    modal.style.display = 'flex';
    modalContent.innerHTML = `<h3>${entry.text}</h3>`;
    modalContent.appendChild(createASLFromText(entry.text));
}

// Close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Attach close button functionality
document.querySelector('.modal-content .close-btn').addEventListener('click', closeModal);

// Close modal on clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// Load translations on page load
window.onload = displayHistory;
