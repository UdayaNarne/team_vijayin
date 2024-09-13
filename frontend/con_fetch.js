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
        displayFarmers(farmers);
        console.log(farmers);
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
        card.addEventListener('click', () => fetchFarmers(contract.contract_ID));
        grid.appendChild(card);
    });
}

function displayFarmers(farmers) {
    const list = document.getElementById('farmer-list');
    list.innerHTML = ''; // Clear existing content
    if (farmers.length === 0) {
        list.textContent = 'No farmers found for this contract.';
        return;
    }
    const ul = document.createElement('ul');
    farmers.forEach(farmer => {
        const li = document.createElement('li');
        li.textContent = `Farmer ID: ${farmer.S.no}, Name: ${farmer.name}`;
        ul.appendChild(li);
    });
    list.appendChild(ul);
}

fetchData();
