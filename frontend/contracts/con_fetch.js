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
        card.querySelector('svg').addEventListener('click', () => fetchFarmers(contract.contract_ID));
        grid.appendChild(card);
    });
}

function displayFarmers(farmers) {
    const grid2 = document.getElementById('farmer-list');
    grid2.innerHTML = ''; // Clear existing content

    if (farmers.length === 0) {
        grid2.textContent = 'No farmers found for this contract.';
        return;
    }

    farmers.forEach(farmer => {
        const card = document.createElement('div');
        card.className = 'farmer-card';
        card.innerHTML = `
            <div class="farmer-info">
                <div>Farmer ID: ${farmer["Serial Number"]}</div>
                <div>Name: ${farmer.name}</div>
            </div>
        `;
        grid2.appendChild(card);
    });
}

function openFarmersWindow(farmers) {
    const newWindow = window.open('farmers.html','_self');
    
    // Write initial HTML structure and CSS for styling the cards
    newWindow.document.write(`
        <html>
            <head>
                <title>Farmers</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    header{
                        margin:0px !important;
                        padding:10px !important;
                    }
                    .farmer-card {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 10px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        background-color: #fff;
                        max-width: 300px;
                    }
                    .farmer-info {
                        font-size: 14px;
                        color: #333;
                    }
                    .p-3,.text-bg-dark{
                        background-color:green !important;
                        margin:0;
                    }
                        .header-container {
                            display: flex;
                            justify-content: space-between;
                            margin:0;
                        }
                        svg{
                            color:white;}
                            .container,.mt-5,.d-flex,.justify-content-end{
    /* width:100%; */
    padding:0px;
    margin:0;
}.search-bar{
    width:50%;
    /* padding:20px; */
    margin-left:50px;
    height:50px;
    border:1px solid black
}

.content-area {
    flex: 1;
    /* padding: 20px; */
}
                </style>
            </head>
            <body>
            <header class="p-3 text-bg-dark d-flex">
                <div class="container-fluid header-container">
                    <div class="d-flex flex-wrap align-items-center"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                    </svg>
                </div> 
            </header>
            <div class="container-fluid mt-2"></div>
    `);

    // Check if there are farmers to display
    if (farmers.length === 0) {
        newWindow.document.write('<p>No farmers found for this contract.</p>');
    } else {
        farmers.forEach(farmer => {
            newWindow.document.write(`
                <div class="farmer-card">
                    <div class="farmer-info">
                        <div>Farmer ID: ${farmer["Aadhar Number"]}</div>
                        <div>Name: ${farmer.name}</div>
                    </div>
                </div>
            `);
        });
    }

    // Close HTML structure
    newWindow.document.write(`
            </body>
        </html>
    `);
    newWindow.document.close();
}

fetchData();
