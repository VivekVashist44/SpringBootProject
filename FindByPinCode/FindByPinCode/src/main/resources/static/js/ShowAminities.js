document.addEventListener('DOMContentLoaded', function () {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const pinCode = urlParams.get('pin');
    const regionName = urlParams.get('region');

    // Determine the data type (PIN or Region)
    if (!pinCode && !regionName) {
        alert('No PIN code or region provided in the URL.');
        return;
    }

    if (pinCode) {
        console.log(`Retrieved PIN Code: ${pinCode}`);
    } else if (regionName) {
        console.log(`Retrieved Region Name: ${regionName}`);
    }

    // Find the Post Offices and CGHS Hospitals buttons
    const postOfficesButton = document.querySelector('.card:nth-child(1) .btn');
    const cghsHospitalsButton = document.querySelector('.card:nth-child(2) .btn');

    // Add click event listener for the Post Offices button
    if (postOfficesButton) {
        postOfficesButton.addEventListener('click', function () {
            // Redirect to the Post Offices page with the correct parameter
            if (pinCode) {
                window.location.href = `result.html?pin=${encodeURIComponent(pinCode)}&type=postOffices`;
            } else if (regionName) {
                window.location.href = `result.html?region=${encodeURIComponent(regionName)}&type=postOffices`;
            }
        });
    } else {
        console.error('Post Offices button not found.');
    }

    // Add click event listener for the CGHS Hospitals button
    if (cghsHospitalsButton) {
        cghsHospitalsButton.addEventListener('click', function () {
            // Redirect to the CGHS Hospitals page with the correct parameter
            if (pinCode) {
                window.location.href = `result.html?pin=${encodeURIComponent(pinCode)}&type=cghsHospitals`;
            } else if (regionName) {
                window.location.href = `result.html?region=${encodeURIComponent(regionName)}&type=cghsHospitals`;
            }
        });
    } else {
        console.error('CGHS Hospitals button not found.');
    }
});
