const express = require('express');
const path = require('path');
const app = express();
const data = require('../frontend/farmer.json');
const data2=require("../frontend/sachivalayam/sachivalayams.json")
const data3=require("../frontend/notifications.json")
const farmers = data.farmers;
const sachivalayams=data2.sachivalayams;
const notifies=data3.notifications;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'backend')));
const cors = require('cors');
app.use(cors());
app.get('/contracts', (req, res) => {
    const contractorName = "Somu";
    const contracts = farmers
        .filter(farmer => farmer["Contractor Name"] === contractorName)
        .map(farmer => ({
            contract_ID: farmer.contract_ID,
            crop_name: farmer["Crop Name"],
            duration:"6 months",
            acres: parseInt(farmer.acres, 10)
        }));
    
    const contractGroups = contracts.reduce((acc, contract) => {
        const key = contract.contract_ID;
        if (!acc[key]) {
            acc[key] = {
                contract_ID: contract.contract_ID,
                crop_name: contract.crop_name,
                duration: contract.duration,
                total_acres: 0
            };
        }
        acc[key].total_acres += contract.acres;
        return acc;
    }, {});

    const uniqueContracts = Object.values(contractGroups);
    const totalAcres = uniqueContracts.reduce((sum, contract) => sum + contract.total_acres, 0);
    res.status(200).json(uniqueContracts); // Ensure status is set to 200
});



app.get('/contracts/:id', (req, res) => {
    const contractId = req.params.id;
    if (!contractId) return res.status(400).send('Contract ID is required');
    const items = farmers.filter(i => i.contract_ID === contractId);
    if (items.length === 0) return res.status(404).send('Items not found');
    res.json(items);
});
app.get('/search/:name', (req, res) => {
    const term = req.params.name;
    if (!term) {
        return res.status(400).json({ message: 'Search term is required' });
    }
    const searchTerm = term.toLowerCase();
    if (!data || !Array.isArray(sachivalayams)) {
        return res.status(500).json({ message: 'Sachivalayam data is not available' });
    }
    const filteredSachivalayams = sachivalayams.filter(sachivalayam => 
        sachivalayam.District.toLowerCase().includes(searchTerm) ||
        sachivalayam.Crop.toLowerCase().includes(searchTerm)
    );
    res.json(filteredSachivalayams);
});


app.get('/notifications',(req,res)=>{
    res.json(notifies);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
