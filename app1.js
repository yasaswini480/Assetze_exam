let express = require('express');
let app = express();

// For POST
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Declaration
app.post('/calculate_asset_depreciation', upload.array(), (request, response) => {
    let costOfAsset = request.body.costOfAsset;
    let salvageValue = request.body.salvageValue;
    let duration = request.body.duration;
    let openingValue = costOfAsset;
    
    const salValue = (salvageValue)*costOfAsset/100;
    const yearlyDepreciation = (costOfAsset - salValue)/ duration;

    console.log(`salValue is + ${salValue}`);   
    console.log(`yearly Depriciation is + ${yearlyDepreciation}`);
    response.send('Result : '+yearlyDepreciation);
    const depreciationSchedule = [];
    
    for (let i = 1; i <= duration; i++) {
        const yearlyAmount = parseFloat((openingValue - yearlyDepreciation).toFixed(2));
        openingValue = yearlyAmount;
        depreciationSchedule.push({
            year: i,
            depreciationAmount: yearlyAmount
            
        });  
        console.log(`Year ${i} Depreciation Amount: ${yearlyAmount}`); 
    }
});


app.listen(3000);