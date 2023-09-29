// content.js

// Listen for messages from the extension background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'fillTextField') {
        // Get the description value from the message
        const description = request.description;

        // Find the text field on the webpage (you might need to adjust this selector)
        const textField = document.querySelector('#yourTextFieldSelector');

        // Check if the text field exists
        if (textField) {
            // Fill the text field with the description
            textField.value = description;
        }
    }
});
