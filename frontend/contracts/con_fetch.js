async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/contracts');
        if (!response.ok) throw new Error('Error fetching contracts');
        const contracts = await response.json();
        displayContracts(contracts);
    } catch (error) {
        console.error(error);
    }
}

async function fetchFarmers(contractId) {
    try {
        const response = await fetch(`http://localhost:3000/contracts/${contractId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const farmers = await response.json();
        openFarmersWindow(farmers);
    } catch (error) {
        console.error('Error fetching farmers:', error);
    }
}
function displayContracts(contracts) {
    const grid = document.getElementById('contract-grid');
    grid.innerHTML = ''; // Clear previous content

    contracts.forEach(contract => {
        // Create the contract card
        const card = document.createElement('div');
        card.className = 'contract-card';
        
        // SVG for the icon
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
            </svg>
        `;

        // Card content with button and SVG
        card.innerHTML = `
        <style>
            button{
                background-color:green;
                
            }
        </style>
            <div class="contract-info" style="padding-left:3%">
                <div style="padding-right:15%">Contract ID: ${contract.contract_ID}</div>
                <div style="padding-right:28%">Crop Name: ${contract.crop_name}</div>
                ${svg}
            </div>
            <button style="margin-left:250px; margin-top:10px;background-color:green" type="button" class="btn btn-primary btn-sm" id="view-contract-${contract.contract_ID}" style="background-color: green; margin-top: 3%;" data-toggle="modal" data-target="#contractModal">
                    View Contract
                </button>
            `;

        // Append card to the grid
        grid.appendChild(card);

        // Event listener for the button to open the modal and show contract details
        const viewButton = card.querySelector(`#view-contract-${contract.contract_ID}`);
        viewButton.addEventListener('click', () => {
            showModal(contract);
        });

        // Event listener for the SVG icon to redirect to farmers.html
        const svgElement = card.querySelector('svg');
        svgElement.setAttribute('data-contract-id', contract.contract_ID);
        svgElement.addEventListener('click', () => {
            // Redirect to farmers.html with contract ID as a query parameter
            window.location.href = `farmers.html?contractId=${contract.contract_ID}`;
        });
    });
}

// Function to populate the modal with contract details
function showModal(contract) {
    document.getElementById('modal-contract-id').textContent = contract.contract_ID;
    document.getElementById('modal-crop-name').textContent = contract.crop_name;
    document.getElementById('modal-total-acres').textContent = contract.total_acres || 'N/A'; // Display total acres
    document.getElementById('modal-duration').textContent = contract.duration || 'N/A'; // Display duration
}

// Modal structure (include this in your HTML, outside the displayContracts function)
document.body.innerHTML += `
    <!-- Modal Structure -->
    <div class="modal fade" id="contractModal" tabindex="-1" role="dialog" aria-labelledby="contractModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contractModalLabel">Contract Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><strong>Contract ID:</strong> <span id="modal-contract-id"></span></p>
            <p><strong>Crop Name:</strong> <span id="modal-crop-name"></span></p>
            <p><strong>Total Acres:</strong> <span id="modal-total-acres"></span></p>
            <p><strong>Duration:</strong> <span id="modal-duration"></span></p>
          </div>
          <div class="modal-footer">
            <button style="background-color:green" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
`;

fetchData();
