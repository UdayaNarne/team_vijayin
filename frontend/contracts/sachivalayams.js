
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
            <td>${sachivalayam.Crop}</td>
        `;

        tableBody.appendChild(row);
    });
}

function detailedView(sachivalayam) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Sachivalayam Details</h2>
            <p><strong>State:</strong> ${sachivalayam.State}</p>
            <p><strong>District:</strong> ${sachivalayam.District}</p>
            <p><strong>Mandal:</strong> ${sachivalayam.Mandal}</p>
            <p><strong>Village:</strong> ${sachivalayam.Village}</p>
            <p><strong>Pincode:</strong> ${sachivalayam.Pincode}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

async function fetchData() {
    try {
        // Get the search term from the input field
        const searchTerm = document.querySelector('.search-bar').value.trim();

        if (!searchTerm) {
            alert('Please enter a district or crop name.');
            return;
        }
        const response = await fetch(`http://localhost:3000/search/${searchTerm}`);
        if (!response.ok) throw new Error('Error fetching sachivalayam data');
        const sachivalayams = await response.json();
        if (sachivalayams.length === 0) {
            alert('No sachivalayam details found for the search term.');
            return;
        }
        displaySachivalayams(sachivalayams);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to fetch the sachivalayam details. Please try again.');
    }
}
document.addEventListener("DOMContentLoaded",function(){
    document.querySelector('.search-bar').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchData();
        }
    });
});

