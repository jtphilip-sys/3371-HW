/*
Name: Joel Thomas Philip
Date created: 2025-06-29
Date last edited: 2025-07-02
Version: 3.0
Description: Homework 3 - All validation, helpers, and dynamic behaviors
*/

// --- DOMContentLoaded for Date and Range Slider ---
document.addEventListener("DOMContentLoaded", function () {
    // Dynamic date display
    const todayElem = document.getElementById("today");
    if (todayElem) {
        const d = new Date();
        todayElem.innerHTML = d.toLocaleDateString();
    }
    // Range slider dynamic display
    const range = document.getElementById("range");
    const rangeSlider = document.getElementById("range-slider");
    if (range && rangeSlider) {
        rangeSlider.textContent = range.value;
        range.addEventListener("input", function () {
            rangeSlider.textContent = range.value;
        });
    }
});

// --- Health Check Display --
function updateRangeValue() { }
const rangeInput = document.getElementById("range");
const valueDisplay = document.getElementById("range-value");
if (rangeInput && valueDisplay) {
    valueDisplay.textContent = rangeInput.value;
}
function validateRange() {
    const rangeInput = document.getElementById("range");
    const errorSpan = document.getElementById("range-error");
    if (!rangeInput || !errorSpan) return false;

    const value = parseInt(rangeInput.value, 10);
    if (isNaN(value) || value < 1 || value > 10) {
        errorSpan.textContent = "Please select a value between 1 and 10.";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Optional: Initialize value on page load
window.addEventListener("DOMContentLoaded", updateRangeValue);


// --- First Name Validation ---
function validateFname() {
    const input = document.getElementById("fname");
    const error = document.getElementById("fname-error");
    const value = input.value.trim();
    if (!/^[a-zA-Z'-]{1,30}$/.test(value)) {
        error.textContent = "First name can only contain letters, apostrophes, and dashes";
        return false;
    }
    error.textContent = "";
    return true;
}
// --- Middle Initial Validation ---
function validateMiddleInit() {
    const input = document.getElementById("middleinit");
    const error = document.getElementById("middleinit-error");
    const value = input.value.trim();
    if (value && !/^[a-zA-Z]{1}$/.test(value)) {
        error.textContent = "Middle initial must be a single letter";
        return false;
    }
    error.textContent = "";
    return true;
}
// --- Last Name Validation ---
function validateLname() {
    const input = document.getElementById("lname");
    const error = document.getElementById("lname-error");
    const value = input.value.trim();
    if (!/^[a-zA-Z'-]{1,30}$/.test(value)) {
        error.textContent = "Last name can only contain letters, apostrophes, and dashes";
        return false;
    }
    error.textContent = "";
    return true;
}

// --- Date of Birth Validation ---
function validateDob() {
    const dobElem = document.getElementById("dob");
    const dobError = document.getElementById("dob-error");
    let date = new Date(dobElem.value);
    let now = new Date();
    let minDate = new Date(now.getFullYear() - 120, now.getMonth(), now.getDate()); // 120 years ago

    if (isNaN(date.getTime())) {
        dobError.textContent = "Please enter a valid date";
        dobElem.value = "";
        return false;
    }
    if (date > now) {
        dobError.textContent = "Date can't be in the future";
        dobElem.value = "";
        return false;
    } else if (date < minDate) {
        dobError.textContent = "Date can't be more than 120 years ago";
        dobElem.value = "";
        return false;
    } else {
        dobError.textContent = "";
        return true;
    }
}

// --- SSN Autoformat & Validation ---
function formatAndValidateSsn() {
    const ssnElem = document.getElementById("ssn");
    const ssnError = document.getElementById("ssn-error");
    let ssn = ssnElem.value.replace(/\D/g, '');
    // Auto-format
    if (ssn.length > 3 && ssn.length <= 5)
        ssn = ssn.slice(0, 3) + '-' + ssn.slice(3);
    else if (ssn.length > 5)
        ssn = ssn.slice(0, 3) + '-' + ssn.slice(3, 5) + '-' + ssn.slice(5, 9);
    ssnElem.value = ssn;
    // Validation
    const ssnR = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
    if (!ssnR.test(ssn)) {
        ssnError.textContent = "Please enter a valid SSN (e.g. 123-45-6789)";
        return false;
    }
    ssnError.textContent = "";
    return true;
}

// --- Address Line 1 Validation ---
function validateAddress1() {
    const addressElem = document.getElementById("address1");
    const addressError = document.getElementById("address1-error");
    const address = addressElem.value.trim();
    const addressR = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    if (!addressR.test(address)) {
        addressError.textContent = "Please enter a valid address";
        return false;
    }
    addressError.textContent = "";
    return true;
}
// --- Address Line 2 Validation (optional) ---
function validateAddress2() {
    const addressElem = document.getElementById("address2");
    const addressError = document.getElementById("address2-error");
    const address = addressElem.value.trim();
    if (address.length === 0) {
        addressError.textContent = "";
        return true;
    }
    const addressR = /^[a-zA-Z0-9\s,.'-]{2,}$/;
    if (!addressR.test(address)) {
        addressError.textContent = "Please enter a valid address";
        return false;
    }
    addressError.textContent = "";
    return true;
}

// --- City Validation ---
function validateCity() {
    const cityElem = document.getElementById("city");
    const cityError = document.getElementById("city-error");
    const city = cityElem.value.trim();
    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "City must be 2-30 characters";
        return false;
    }
    cityError.textContent = "";
    return true;
}
// --- State Dropdown Validation ---
function validateState() {
    const stateElem = document.getElementById("State");
    const stateError = document.getElementById("state-error");
    if (!stateElem.value) {
        stateError.textContent = "Please select a state";
        return false;
    }
    stateError.textContent = "";
    return true;
}

// --- ZIP Code Validation (US: 5 or 9 digits) ---
function validateZip() {
    const zipInput = document.getElementById("zip");
    const zipError = document.getElementById("zip-error");
    let zip = zipInput.value.replace(/[^\d]/g, "");
    if (!zip) {
        zipError.textContent = "Zip code cannot be empty";
        return false;
    }
    if (!(zip.length === 5 || zip.length === 9)) {
        zipError.textContent = "Zip code must be 5 or 9 digits";
        return false;
    }
    // Format as 5 digits or 5-4
    if (zip.length === 9) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    }
    zipInput.value = zip;
    zipError.textContent = "";
    return true;
}

// --- Email Validation ---
function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    let email = emailInput.value.trim();
    const emailR = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/i;

    if (!email) {
        emailError.textContent = "Email cannot be empty";
        return false;
    }
    if (!emailR.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        return false;
    }
    emailInput.value = email;
    emailError.textContent = "";
    return true;
}

// --- Phone Number Validation (US: 10 digits) ---
function validatePhone() {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    let phone = phoneInput.value.replace(/[^\d]/g, "");

    if (!phone) {
        phoneError.textContent = "Phone number cannot be empty";
        return false;
    }
    if (phone.length !== 10) {
        phoneError.textContent = "Phone number must be 10 digits";
        return false;
    }
    phone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6, 10);
    phoneInput.value = phone;
    phoneError.textContent = "";
    return true;
}

// --- User ID Validation ---
function validateUid() {
    let uidElem = document.getElementById("uid");
    let uid = uidElem.value;
    const uidError = document.getElementById("uid-error");

    if (!uid) {
        uidError.textContent = "User ID cannot be empty";
        return false;
    }
    if (!isNaN(Number(uid.charAt(0)))) {
        uidError.textContent = "User ID cannot start with a number";
        return false;
    }
    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        uidError.textContent = "User ID can only contain letters, numbers, underscores and dashes";
        return false;
    } else if (uid.length < 5) {
        uidError.textContent = "User ID must be at least 5 characters long";
        return false;
    } else if (uid.length > 20) {
        uidError.textContent = "User ID cannot exceed 20 characters";
        return false;
    } else {
        uidError.textContent = "";
        return true;
    }
}

// --- Password Validation ---
function validatePword() {
    var passwordoutput;
    var passwordElem = document.getElementById("pword");
    var error_flag = 0;
    if (!passwordElem) return false;
    var passwordinput = passwordElem.value;
    // Validate lowercase letters
    if (passwordinput.search(/[a-z]/) < 0) {
        passwordoutput = "Enter at least 1 lower case letter";
        error_flag = 1;
    } else {
        passwordoutput = "Has at least 1 lower case letter";
    }
    if (document.getElementById("msg1"))
        document.getElementById("msg1").innerHTML = passwordoutput;
    // Validate capital letters
    if (passwordinput.search(/[A-Z]/) < 0) {
        passwordoutput = "Enter at least 1 upper case letter";
        error_flag = 1;
    } else {
        passwordoutput = "Has at least 1 upper case letter";
    }
    if (document.getElementById("msg2"))
        document.getElementById("msg2").innerHTML = passwordoutput;
    // Validate numbers
    if (passwordinput.search(/[0-9]/) < 0) {
        passwordoutput = "Enter at least 1 number";
        error_flag = 1;
    } else {
        passwordoutput = "Has at least 1 number";
    }
    if (document.getElementById("msg3"))
        document.getElementById("msg3").innerHTML = passwordoutput;
    // Validate special chars
    if (passwordinput.search(/[!\@#\$%&*\-_\\.+\(\)]/) < 0) {
        passwordoutput = "Enter at least 1 special character";
        error_flag = 1;
    } else {
        passwordoutput = "Has at least 1 special character";
    }
    if (document.getElementById("msg4"))
        document.getElementById("msg4").innerHTML = passwordoutput;
    // Validate length
    if (passwordinput.length < 8) {
        passwordoutput = "Enter a minimum of 8 characters";
        error_flag = 1;
    } else {
        passwordoutput = "Password is 8 or more characters";
    }
    if (document.getElementById("msg5"))
        document.getElementById("msg5").innerHTML = passwordoutput;
    return error_flag === 0;
}

// --- Confirm Password Validation ---
function confirmPword() {
    const pword1 = document.getElementById("pword").value;
    const pword2 = document.getElementById("cpword").value;

    if (pword1 !== pword2) {
        document.getElementById("cpword-error").innerHTML = "Passwords do not match";
        return false;
    } else {
        document.getElementById("cpword-error").innerHTML = "Passwords match";
        return true;
    }
}

// --- Form-wide Validation for Validate Button ---
function validateForm() {
    // Call all field validators, if all valid, show submit, else keep hidden
    let allValid = true;
    allValid &= validateFname();
    allValid &= validateMiddleInit();
    allValid &= validateLname();
    allValid &= validateDob();
    allValid &= formatAndValidateSsn();
    allValid &= validateAddress1();
    allValid &= validateAddress2();
    allValid &= validateCity();
    allValid &= validateState();
    allValid &= validateZip();
    allValid &= validateEmail();
    allValid &= validatePhone();
    allValid &= validateUid();
    allValid &= validatePword();
    allValid &= confirmPword();
    allValid &= validateRange();
    // Add more as needed for other fields (like checkboxes/radios if required)
    if (allValid) {
        document.getElementById('submitBtn').style.display = '';
        document.getElementById('validateBtn').style.display = 'none';
        reviewInp();
    }

    function reviewInp() {
        var formcontent = document.getElementById("signup");
        if (!formcontent) return;
        var formoutput = "<table class='output'><th colspan='2'> Review All Your Information:</th>";
        for (let i = 0; i < formcontent.elements.length; i++) {
            let elem = formcontent.elements[i];
            // Ignore button, submit, reset, fieldset, hidden, etc.
            if (["button", "submit", "reset", "fieldset", "hidden"].includes(elem.type)) continue;

            let label = getLabelText(elem.id) || elem.name;

            switch (elem.type) {
                case "checkbox":
                    formoutput += `<tr><td align='right'>${label}</td><td>${elem.checked ? "&#x2713;" : "&#10008;"}</td></tr>`;
                    break;
                case "radio":
                    if (elem.checked)
                        formoutput += `<tr><td align='right'>${label}</td><td>${elem.value}</td></tr>`;
                    break;
                case "password":
                    formoutput += `<tr><td align='right'>${label}</td><td>********</td></tr>`;
                    break;
                case "range":
                    formoutput += `<tr><td align='right'>${label}</td><td>${elem.value}</td></tr>`;
                    break;
                default:
                    formoutput += `<tr><td align='right'>${label}</td><td>${elem.value}</td></tr>`;
            }
        }
        formoutput += "</table>";
        const showInputElem = document.getElementById("showInput");
        if (showInputElem) {
            showInputElem.innerHTML = formoutput;
        }
    }

    function getLabelText(id) {
        if (!id) return null;
        let labels = document.getElementsByTagName("label");
        for (let label of labels) {
            if (label.htmlFor === id) {
                return label.textContent.trim();
            }
        }
        return null;
    }

    // --- Remove review data ---
    function removeReview() {
        document.getElementById("showInput").innerHTML = "";
    }
}

// --- Thank You Iframe Behavior ---
window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup");
    const iframe = document.getElementById("thankyouFrame");

    if (form && iframe) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent page reload

            // Hide the form and show the iframe
            form.style.display = "none";
            iframe.style.display = "block";
            // Load the thank you page
            iframe.src = "hw3-thankyou.html";
        });
    }
});