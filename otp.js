const inputs = document.querySelectorAll('.otp-card-inputs input');
const button = document.querySelector('.otp-card button'); // Updated selector for clarity

inputs.forEach((input, index) => {
    let lastInputStatus = 0;
    
    input.onkeyup = (e) => {
        const currentElement = e.target;
        const nextElement = input.nextElementSibling;
        const prevElement = input.previousElementSibling;

        if (prevElement && e.keyCode === 8) { // Backspace
            if (lastInputStatus === 1) {
                prevElement.value = '';
                prevElement.focus();
            }
            lastInputStatus = 1;
        } else {
            const reg = /^[0-9]+$/;
            if (!reg.test(currentElement.value)) {
                currentElement.value = currentElement.value.replace(/\D/g, '');  
            } else if (currentElement.value) {
                if (nextElement) {
                    nextElement.focus();
                }
                lastInputStatus = 0;
            }
        }

        // Check if all inputs are filled
        const allFilled = Array.from(inputs).every(input => input.value);
        if (allFilled) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }
    };
});


document.getElementById("phoneNumberForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const phoneNumber = document.getElementById("phoneNumber").value;
    if (phoneNumber.length === 9 && /^[0-9]+$/.test(phoneNumber)) {
        document.getElementById("phoneForm").style.display = "none";
        document.getElementById("otpForm").style.display = "block";
    } else {
        alert("Please enter a valid 9-digit phone number.");
    }
});

document.getElementById("phoneNumberForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to avoid page reload
    
    // Capture the user's phone number input
    const phoneNumber = document.getElementById("phoneNumber").value;
    
    // Display the OTP form and hide the phone number form
    document.getElementById("phoneForm").style.display = "none";
    document.getElementById("otpForm").style.display = "block";
    
    // Update the OTP message with the entered phone number
    document.getElementById("otpMessage").innerText = `Code has been sent to +971 ${phoneNumber}`;
});


function switchToPhoneVerification() {
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('phoneForm').style.display = 'block';
}

function switchToEmailVerification() {
    document.getElementById('phoneForm').style.display = 'none';
    document.getElementById('emailForm').style.display = 'block';
}

function submitForm(event, formType) {
    event.preventDefault();
    // Assuming the verification is successful
    document.getElementById('otpForm').style.display = 'block';
    if (formType === 'phone') {
        document.getElementById('otpMessage').innerText = 'OTP has been sent to your phone number';
    } else {
        document.getElementById('otpMessage').innerText = 'OTP has been sent to your email address';
    }
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('phoneForm').style.display = 'none';
}