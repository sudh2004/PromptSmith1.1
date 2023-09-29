// Load the JSON data when the page loads
document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Store the JSON data in a variable for later use
            const jsonData = data;
            
            // Listen for input changes in the search box
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", function () {
                const searchTerm = searchInput.value.toLowerCase();

                // Filter the JSON data based on the search term
                const filteredData = jsonData.filter(item => {
                    return item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
                });

                // Display the filtered results
                displayResults(filteredData);
            });
        })
        .catch(error => console.error("Error loading JSON data: ", error));
});
// ... (your existing code)

// ... (your existing code)

function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML = "No results found.";
        return;
    }

    let selectedItem = null; // Store the selected item

    results.forEach(item => {
        const resultItem = document.createElement("div");
        const nameElement = document.createElement("h3");

        nameElement.textContent = item.name;

        // Add a click event listener to the h3 element to select the item
        nameElement.addEventListener("click", function () {
            selectedItem = item;

            const popup = document.getElementById("popup");
            const popupTitle = document.getElementById("popupTitle");
            const popupDescription = document.getElementById("popupDescription");

            // Set the title and description in the input boxes
            popupTitle.value = item.name;
            popupDescription.value = item.description;

            // Show the popup
            popup.style.display = "block";
        });

        resultItem.appendChild(nameElement);
        resultsContainer.appendChild(resultItem);
    });

    // Add event listener to the "Copy" button
    const popupCopyButton = document.getElementById("popupCopy");
    popupCopyButton.addEventListener("click", function () {
        if (selectedItem) {
            const popupDescription = document.getElementById("popupDescription");

            // Copy the content of the description input box
            popupDescription.select();
            document.execCommand("copy");
        }
    });

    // Add event listener to the "Cancel" button
    const popupCancelButton = document.getElementById("popupCancel");
    popupCancelButton.addEventListener("click", function () {
        selectedItem = null; // Deselect the item
        const popup = document.getElementById("popup");

        // Clear the input boxes and hide the popup
        const popupTitle = document.getElementById("popupTitle");
        const popupDescription = document.getElementById("popupDescription");
        popupTitle.value = "";
        popupDescription.value = "";
        popup.style.display = "none";
    });
}