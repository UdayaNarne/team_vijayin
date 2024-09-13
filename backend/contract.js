const express=require('express');
const path=require('path');
const app=express();
const data=require('../team_vijayin/farmer.json');
const farmers=data.farmers;
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'backend')));

app.get('/contracts', (req, res) => {
    const uniqueContractIds = new Set(farmers.map(farmer => farmer.contract_ID));
    const uniqueCount = uniqueContractIds.size;
    res.json({ uniqueCount });
});

app.get('/contracts/:id', (req, res) => {
    const contractId=parseInt(req.params.id);
    if(isNaN(contractId)){
        return res.json(data);
    }
    const items=farmers.filter(i=>i.contract_ID==contractId);
    if (items.length === 0) return res.status(404).send('Items not found');
    res.json(items);
});
  
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})