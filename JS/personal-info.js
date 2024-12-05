function editValue(button) {
    const infoItem = button.parentElement;
    const valueSpan = infoItem.querySelector('.value');
    const inputField = infoItem.querySelector('.input-field');
    const okButton = infoItem.querySelector('.ok-btn');
    const cancelButton = infoItem.querySelector('.cancel-btn');

    // Set character limits
    const label = infoItem.querySelector('.label').innerText.toLowerCase();
    if (label.includes('name')) {
        inputField.maxLength = 40; // Set max length for Name
    } else if (label.includes('email')) {
        inputField.maxLength = 50; // Set max length for Email
    } else if (label.includes('phone number')) {
        inputField.maxLength = 15; // Set max length for Phone Number
    } else if (label.includes('address')) {
        inputField.maxLength = 100; // Set max length for Address
    }

    // Show input field and OK/Cancel buttons
    inputField.style.display = 'block';
    inputField.value = valueSpan.innerText === 'Not provided' ? '' : valueSpan.innerText;
    okButton.style.display = 'inline-block';
    cancelButton.style.display = 'inline-block';
    button.style.display = 'none'; // Hide the Edit/Add button
}

function saveValue(button) {
    const infoItem = button.closest('.info-item');
    const valueSpan = infoItem.querySelector('.value');
    const inputField = infoItem.querySelector('.input-field');
    const editButton = infoItem.querySelector('.edit-btn');

    // Update the displayed value
    valueSpan.innerText = inputField.value ? inputField.value : 'Not provided';

    // Show the Edit/Add button again
    editButton.innerText = valueSpan.innerText === 'Not provided' ? 'Add' : 'Edit';
    editButton.style.display = 'inline-block'; // Show the button again

    // Hide the input field and OK/Cancel buttons
    inputField.style.display = 'none';
    button.style.display = 'none';
    infoItem.querySelector('.cancel-btn').style.display = 'none';
}

function cancelEdit(button) {
    const infoItem = button.closest('.info-item');
    const inputField = infoItem.querySelector('.input-field');
    const editButton = infoItem.querySelector('.edit-btn');

    // Hide the input field and OK/Cancel buttons
    inputField.style.display = 'none';
    button.style.display = 'none'; // Hide the Cancel button
    infoItem.querySelector('.ok-btn').style.display = 'none'; // Hide the OK button
    editButton.style.display = 'inline-block'; // Show the Edit/Add button again
}

function triggerUpload() {
    document.getElementById('upload-photo').click();
}

function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('photo-preview').src = e.target.result;
            document.querySelector('.change-btn').innerText = 'Change Photo';
            document.querySelector('.remove-btn').style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    // Reset to blank-user.png when photo is removed
    document.getElementById('photo-preview').src = 'Images/blank-user.png'; 
    document.getElementById('upload-photo').value = ''; // Clear file input
    document.querySelector('.change-btn').innerText = 'Add Photo'; // Change button back to 'Add Photo'
    document.querySelector('.remove-btn').style.display = 'none'; // Hide the 'Remove Photo' button
}
