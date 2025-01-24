document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('amenitiesTableBody');
    const tableTitle = document.getElementById('tableTitle'); // The element where we will display the title
    const urlParams = new URLSearchParams(window.location.search);
    const pinCode = urlParams.get('pin');
    const regionName = urlParams.get('region');
    const type = urlParams.get('type'); // Get the 'type' (either 'postOffices' or 'cghsHospitals')

    // Show a loading spinner while fetching data
    function showLoadingSpinner() {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Loading data, please wait...</td></tr>`;
        tableTitle.innerHTML = ''; // Clear title while loading
    }

    // Show "No Data Found" message
    function showNoDataMessage() {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No data found for the provided parameters.</td></tr>`;
    }

    // Set table title dynamically based on the type
    function setTableTitle() {
        if (type === 'postOffices') {
            tableTitle.innerHTML = '<h3>Post Office Data</h3>';
        } else if (type === 'cghsHospitals') {
            tableTitle.innerHTML = '<h3>CGHS Hospitals Data</h3>';
        } else {
            tableTitle.innerHTML = ''; // Clear title if 'type' is not valid
        }
    }

    // Fetch and display Post Offices by PIN or Region
    function loadPostOffices() {
        const url = pinCode
            ? `http://localhost:8080/pin/${pinCode}/getAllPostOffice`
            : `http://localhost:8080/region/${regionName}/getAllPostOffice`;

        showLoadingSpinner();
        setTableTitle(); // Set the correct title

        fetch(url)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear existing content
                if (data && data.length > 0) {
                    data.forEach(postOffice => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${postOffice.Name || 'N/A'}</td>
                            <td>${postOffice.State || 'N/A'}</td>
                            <td>${postOffice.District || 'N/A'}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                    $('#amenitiesTable').DataTable(); // Initialize DataTable
                } else {
                    showNoDataMessage();
                }
            })
            .catch(() => showNoDataMessage());
    }

    // Fetch and display CGHS Hospitals by PIN or Region
    function loadCghsHospitals() {
        const url = pinCode
            ? `http://localhost:8080/pin/${pinCode}/CGHSHospital`
            : `http://localhost:8080/region/${regionName}/CGHSHospital`;

        showLoadingSpinner();
        setTableTitle(); // Set the correct title

        fetch(url)
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = ''; // Clear existing content
                if (data && data.records && data.records.length > 0) {
                    data.records.forEach(hospital => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${hospital.hospitalName || 'N/A'}</td>
                            <td>${hospital.hospitalAddress || 'N/A'}</td>
                            <td>${hospital.cityName || 'N/A'}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                    $('#amenitiesTable').DataTable(); // Initialize DataTable
                } else {
                    showNoDataMessage();
                }
            })
            .catch(() => showNoDataMessage());
    }

    // Initialize the table based on the current selection or query
    if (type === 'postOffices') {
        loadPostOffices(); // Load Post Offices data
    } else if (type === 'cghsHospitals') {
        loadCghsHospitals(); // Load CGHS Hospitals data
    } else {
        showNoDataMessage(); // If 'type' is not provided or incorrect, show no data message
    }
});
