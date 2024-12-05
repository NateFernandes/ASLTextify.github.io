function toggleVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);

    if (input.type === "password") {
        input.type = "text";
        toggleIcon.src = "Images/pass_visibilityon.svg";  // Switch to visibility-on icon
    } else {
        input.type = "password";
        toggleIcon.src = "Images/pass_visibilityoff.svg"; // Switch to visibility-off icon
    }
}
