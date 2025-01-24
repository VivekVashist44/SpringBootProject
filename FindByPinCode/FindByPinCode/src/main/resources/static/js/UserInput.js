document.addEventListener('DOMContentLoaded', function () {
    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons and contents
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));

            // Add active class to the clicked button and corresponding content
            const targetTab = this.getAttribute('data-tab');
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Handle form submission for PIN search
    document.querySelector("#pinForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Disable the button to prevent multiple clicks

        const pinCode = document.getElementById('pinInput').value.trim();
        if (!pinCode) {
            alert('Please enter a PIN code.');
            submitButton.disabled = false; // Re-enable the button if input is invalid
            return;
        }

        const url = `http://localhost:8080/pin/${pinCode}`;
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.Status === 'Success' && data.PostOffice && data.PostOffice.length > 0) {
                    window.location.href = `/ShowAminities.html?pin=${pinCode}`;
                } else {
                    alert('No data found for the provided PIN code.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(`An error occurred while searching for PIN code: ${pinCode}. Please try again.`);
            })
            .finally(() => {
                submitButton.disabled = false; // Re-enable the button after request completion
            });
    });

    // Handle form submission for Region search
    document.querySelector("#regionForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Disable the button to prevent multiple clicks

        const regionLocation = document.getElementById('regionInput').value.trim();
        if (!regionLocation) {
            alert('Please enter a region.');
            submitButton.disabled = false; // Re-enable the button if input is invalid
            return;
        }

        const url = `http://localhost:8080/region/${regionLocation}`;
        await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => {
				console.log('Fetched Data:', data.PostOffice);
                if (data.Status === 'Success' && data.PostOffice && data.PostOffice.length > 0) {
                    window.location.href = `/ShowAminities.html?region=${regionLocation}`;
                } else {
					
                    alert('No data found for the provided region.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(`An error occurred while searching for region: ${regionLocation}. Please try again.`);
            })
            .finally(() => {
                submitButton.disabled = false; // Re-enable the button after request completion
            });
    });
});
