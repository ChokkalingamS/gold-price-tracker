const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { getPrice, sendAlerts } = require('../services/price.service');


const price = catchAsync(async (req, res) => {
    
    const data = await getPrice()
    console.log(data);
    if (data.success && data.rates.XAU) {
        const ratePerINR = data.rates.XAU;
        const ratePerOunce = 1 / ratePerINR;
        const perGram = ratePerOunce / 31.1035;
        const markup = 0.08;
        const retail24K = perGram * (1 + markup);
        const retail22K = retail24K * 0.916;


        const priceObj = {
            ratePerOunce: ratePerOunce.toFixed(2),
            perGram: perGram.toFixed(2),
            retail24K: retail24K.toFixed(2),
            retail22K: retail22K.toFixed(2),
        }
        sendAlerts();

        res.status(httpStatus.OK).send(priceObj);
    }


});


module.exports = {
  price,
};