document.addEventListener('DOMContentLoaded', function () {
    const icon = document.querySelector('.icon');
    const sentenceElement = document.getElementById('output-sentence');
    let isSpeaking = false; // Tracks if TTS is currently speaking
    let speechSynthesisUtterance; // Reference to the current speech utterance

    icon.addEventListener('click', function () {
        const sentence = sentenceElement.textContent.trim();

        if (!isSpeaking) {
            // Start TTS
            if (!sentence) {
                return; // Do nothing if no sentence is available
            }

            // Change button to stop icon
            icon.src = 'Images/stop-icon.png'; // Update to a stop icon

            speechSynthesisUtterance = new SpeechSynthesisUtterance(sentence);

            // Event listener for when speech ends
            speechSynthesisUtterance.onend = function () {
                isSpeaking = false;
                icon.src = 'Images/speaker.png'; // Revert to speaker icon
            };

            // Speak the sentence
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
