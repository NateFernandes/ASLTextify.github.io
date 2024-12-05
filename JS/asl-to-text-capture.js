document.addEventListener('DOMContentLoaded', function () {
    const showSignsButton = document.getElementById('show-asl-signs-button');
    const aslSignsDisplay = document.getElementById('asl-signs-display');
    const aslContent = document.querySelector('.asl-content');

    // Initially center the video feed
    aslContent.style.justifyContent = 'center';

    showSignsButton.addEventListener('click', function () {
        // Toggle visibility
        if (aslSignsDisplay.style.display === 'none' || aslSignsDisplay.style.display === '') {
            aslSignsDisplay.style.display = 'flex'; // Instantly show
            aslContent.style.justifyContent = 'space-between'; // Adjust layout
            showSignsButton.textContent = 'Hide ASL Signs'; // Update button text
        } else {
            aslSignsDisplay.style.display = 'none'; // Instantly hide
            aslContent.style.justifyContent = 'center'; // Center the video feed
            showSignsButton.textContent = 'Show ASL Signs'; // Reset button text
        }
    });
});

document.querySelector('.save-history-button').addEventListener('click', () => {
    const sentence = document.getElementById('output-sentence').innerText;

    if (!sentence) {
        alert('No translation available to save.');
        return;
    }

    fetch('/asl-to-text.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: sentence })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert('Translation saved successfully!');
            console.log('Saved translation:', data);
        }
    })
    .catch(err => {
        console.error('Error saving translation:', err);
    });
});
