// Handle manual and automatic capture mode toggling
document.getElementById('manual-capture-checkbox').addEventListener('change', function(event) {
    if (event.target.checked) {
        // Switch to manual capture mode
        fetch('/set_manual_capture', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Manual Capture Mode enabled');
            }
        });
    } else {
        // Switch to automatic capture mode
        fetch('/set_auto_capture', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Automatic Capture Mode enabled');
            }
        });
    }
});

// Listen for the 'c' key press to manually capture the gesture
document.addEventListener('keydown', function(event) {
    if (event.key === 'c' && document.getElementById('manual-capture-checkbox').checked) {
        fetch('/manual_capture', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Manual capture triggered');
            }
        });
    }
});

// Make the "Capture Sign" button trigger the same functionality as the "c" key
document.querySelector('.capture-sign-button').addEventListener('click', function () {
    if (document.getElementById('manual-capture-checkbox').checked) {
        // Trigger the manual capture functionality
        fetch('/manual_capture', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                console.log('Manual capture triggered by button');
            }
        });
    }
});


// Function to update the word and sentence on the webpage
function updateOutput() {
    fetch('/get_word')
        .then(response => response.json())
        .then(data => {
            // Update the word and sentence sections dynamically
            document.getElementById('output-word').textContent = data.word;
            document.getElementById('output-sentence').textContent = data.sentence;
        })
        .catch(error => console.error("Error fetching output:", error));
}

// Poll the server every 500 milliseconds for updates
setInterval(updateOutput, 500);

// Handle Capture ASL button toggling
document.querySelector('.capture-asl-button').addEventListener('click', function() {
    const button = this;
    const videoFeed = document.querySelector('.asl-video-container img'); // Reference the video feed container

    fetch('/toggle_capturing', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.capturing) {
                button.textContent = "Stop Capturing";
                button.style.backgroundColor = "red";
                videoFeed.src = "/video_feed"; // Start showing the video feed
            } else {
                button.textContent = "Capture ASL";
                button.style.backgroundColor = "";
                videoFeed.src = "Images/capture-asl-message.png"; // Clear the video feed
            }
        });
});

// Handle Clear Sentence button click
document.getElementById('clear-sentence-button').addEventListener('click', function () {
    fetch('/clear_sentence', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('output-sentence').textContent = ""; // Clear the Sentence section
                console.log(data.message); // Log success message
            }
        })
        .catch(error => console.error("Error clearing sentence:", error));
});
