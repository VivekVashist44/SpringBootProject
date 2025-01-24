document.addEventListener('DOMContentLoaded', function() {
    // Function to get query parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the pinCode from the URL
    const pinCode = getQueryParam('pin');
    console.log("PIN Code:", pinCode);

    // Select DOM elements for loading spinner, error message, and table body
    const tableBody = document.getElementById('cghsHospitalsTableBody');
    const loadingSpinner = document.createElement('div');
    const errorMessage = document.createElement('div');

    // Add a loading spinner
    loadingSpinner.id = 'loading-spinner';
    loadingSpinner.style.textAlign = 'center';
    loadingSpinner.style.padding = '2rem';
    loadingSpinner.innerHTML = `
        <img src="/images/spinner-3.gif" alt="Loading..." style="width: 50px; height: 50px;">
        <p>Loading data, please wait...</p>
    `;
    tableBody.parentElement.appendChild(loadingSpinner);

    // Add a placeholder for "No Data Found"
    errorMessage.id = 'no-data-message';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.padding = '2rem';
    errorMessage.style.display = 'none';
    errorMessage.innerHTML = `<p>No data found for the provided PIN code. Please try another.</p>`;
    tableBody.parentElement.appendChild(errorMessage);

    if (pinCode) {
        console.log('PIN Code:', pinCode);

        // Show the loading spinner
        loadingSpinner.style.display = 'block';

        // Fetch data from the API
        fetch(`http://localhost:8080/pin/${pinCode}/CGHSHospital`)
            .then(response => response.json())
            .then(data => {
                // Hide the loading spinner
                loadingSpinner.style.display = 'none';

                if (data.records && data.records.length > 0) {
                    console.log('CGHS Hospitals:', data.records);
                    populateTable(data.records);
                } else {
                    // Show "No Data Found" message in the table
                    tableBody.innerHTML = ''; // Clear the table body content
                    errorMessage.style.display = 'block'; // Display the "No data" message
                }
            })
            .catch(error => {
                console.error('Error fetching CGHS hospital data:', error);

                // Hide the loading spinner and show error message
                loadingSpinner.style.display = 'none';
                errorMessage.innerHTML = `
                    <p>An error occurred while fetching CGHS hospital data. Please try again later.</p>
                `;
                errorMessage.style.display = 'block';
            });
    } else {
        // No PIN Code provided, hide spinner and show an error
        loadingSpinner.style.display = 'none';
        errorMessage.innerHTML = `<p>No PIN code provided in the URL.</p>`;
        errorMessage.style.display = 'block';
    }

    function populateTable(data) {
        tableBody.innerHTML = ''; // Clear existing content

        data.forEach(hospital => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${hospital.hospitalName || 'N/A'}</td>
                <td>${hospital.hospitalAddress || 'Address not available'}</td>
                <td>${hospital.cityName || 'City not available'}</td>
            `;
            tableBody.appendChild(row);
        });

        // Initialize DataTable after populating the table body
        $('#cghsHospitalsTable').DataTable();
    }
});
