document.addEventListener('DOMContentLoaded', function () {
    const icon = document.querySelector('.icon');
    const textarea = document.getElementById('input-text');
    let isSpeaking = false; // Tracks if TTS is currently speaking
    let speechSynthesisUtterance; // Reference to the current speech utterance

    icon.addEventListener('click', function () {
        const text = textarea.value.trim();

        if (!isSpeaking) {
            // Start TTS
            if (!text) {
                return; // Do nothing if no text is entered
            }

            // Change button to stop icon
            icon.src = 'Images/stop-icon.png'; // Update to a stop icon

            speechSynthesisUtterance = new SpeechSynthesisUtterance(text);

            // Event listener for when speech ends
            speechSynthesisUtterance.onend = function () {
                isSpeaking = false;
                icon.src = 'Images/speaker.png'; // Revert to speaker icon
            };

            // Speak the text
            window.speechSynthesis.speak(speechSynthesisUtterance);
            isSpeaking = true;
        } else {
            // Stop TTS
            window.speechSynthesis.cancel();
            isSpeaking = false;

            // Revert to speaker icon
            icon.src = 'Images/speaker.png';
        }
    });
});
