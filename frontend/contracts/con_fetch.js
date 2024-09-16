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
    grid.innerHTML = '';
    contracts.forEach(contract => {
        const card = document.createElement('div');
        card.className = 'contract-card';
        card.textContent = `Contract ID: ${contract.contract_ID}`;
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
            </svg>
        `;

        card.innerHTML = `
            <div class="contract-info">
                <div>Contract ID: ${contract.contract_ID}</div>
                ${svg}
            </div>
        `;
        const svgElement = card.querySelector('svg');
        svgElement.setAttribute('data-contract-id', contract.contract_ID);
        svgElement.addEventListener('click', () => {
            // Redirect to farmers.html with contract ID as a query parameter
            window.location.href = `farmers.html?contractId=${contract.contract_ID}`;
        });
        grid.appendChild(card);
    });
}
fetchData();
