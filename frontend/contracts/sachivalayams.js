function newRegistration() {
    window.location.href = '../sachivalayam/newRegistration.html';
}
fetch('/frontend/sachivalayam/sachivalayams.json')
    .then(response => response.json())
    .then(data => {
        const sachivalayams = data.sachivalayams;
        displaySachivalayams(sachivalayams);
    })
    .catch(error => console.error('Error loading farmer data:', error));

// Function to display farmers in the table
function displaySachivalayams(sachivalayams) {
    const tableBody = document.querySelector('#sachivalayamtable');
    tableBody.innerHTML = '';
    sachivalayams.forEach((sachivalayam, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${sachivalayam.State}</td>
            <td>${sachivalayam.District}</td>
            <td>${sachivalayam.Mandal}</td>
            <td>${sachivalayam.Village}</td>
            <td>${sachivalayam.Pincode}</td>
        `;

        tableBody.appendChild(row);
    });
}

async function fetchData() {
    try {
        const districtName = document.querySelector('.search-bar').value.trim();
        if (!districtName) {
            alert('Please enter a district name.');
            return;
        }
        const response = await fetch(`http://localhost:3000/districts/${districtName}`);
        if (!response.ok) throw new Error('Error fetching sachivalayam data');
        const sachivalayams = await response.json();
        displaySachivalayams(sachivalayams);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch the sachivalayam details. Please try again.');
    }
}
document.querySelector('.search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        fetchData();
    }
});


