// background.js

// Example: Send a message with the description value
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const description = "Your description here"; // Replace with the actual description
    chrome.tabs.sendMessage(tabs[0].id, { action: 'fillTextField', description });
});
