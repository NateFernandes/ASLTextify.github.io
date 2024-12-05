function openModal(videoUrl) {
    document.getElementById('videoFrame').src = videoUrl; // Set the video URL
    document.getElementById('videoModal').style.display = 'block'; // Show the modal
}

function closeModal() {
    document.getElementById('videoModal').style.display = 'none'; // Hide the modal
    document.getElementById('videoFrame').src = ''; // Clear the video source
}

// Close modal when the user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target === document.getElementById('videoModal')) {
        closeModal();
    }
};
