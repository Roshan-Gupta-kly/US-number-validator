document.getElementById('check-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim(); // Retrieve the user input and trim any whitespace
    const resultsDiv = document.getElementById('results-div'); // Get the results div element
    
    if (!userInput) { // Check if the user input is empty
        alert('Please provide a phone number'); // Display an alert if the input is empty
        return; // Exit the function
    }
    
    const isValid = validatePhoneNumber(userInput); // Validate the phone number input
    if (isValid) { // If the phone number is valid
        resultsDiv.textContent = `Valid US number: ${userInput}`; // Display the valid phone number in the results div
        resultsDiv.style.color = 'green'; // Set the text color to green
    } else { // If the phone number is invalid
        resultsDiv.textContent = `Invalid US number: ${userInput}`; // Display the invalid phone number in the results div
        resultsDiv.style.color = 'red'; // Set the text color to red
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('user-input').value = ''; // Clear the user input field
    document.getElementById('results-div').textContent = ''; // Clear the results div content
});

function validatePhoneNumber(phoneNumber) {
    // Regular expressions for validating US phone numbers
    const validPatterns = [
    /^1?\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/, // Matches patterns like 555-555-5555, 555 555 5555, 5555555555
    /^1?\s?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/, // Matches patterns like (555) 555-5555, (555)555-5555
    /^1?\(\d{3}\)\d{3}[-\s]?\d{4}$/, // Matches patterns like (555)5555555
    /^1?\s?\d{3}\s?\d{3}\s?\d{4}$/, // Matches patterns like 555 5555555
    /^1?\(\d{3}\)\d{3}-\d{4}$/, // Matches patterns like (555)555-5555
    /^\d{10}$/, // Matches patterns like 5555555555
    /^1?\(?\d{3}\)?\d{3}-\d{4}$/, // Matches patterns like 1(555)555-5555
];
    
    // Regular expressions for detecting invalid phone number formats
    const invalidPatterns = [
        /\(\d{3}\)\d{3}\d{4}/, // Detects patterns without separators after area code like (555)5555555
        /[^\d\s()-]/, // Detects any invalid characters
    ];
    
    // Ensure the phone number matches one of the valid patterns
    let isValid = validPatterns.some(pattern => pattern.test(phoneNumber));
    
    // Ensure the phone number does not match any of the invalid patterns
    if (isValid) {
        isValid = !invalidPatterns.some(pattern => pattern.test(phoneNumber));
    }

    // Check country code
    if (isValid && phoneNumber.startsWith('1')) {
        const countryCodePattern = /^1\s?/;
        isValid = countryCodePattern.test(phoneNumber);
    }
    
    return isValid;
}
