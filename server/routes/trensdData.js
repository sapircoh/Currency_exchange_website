const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.get('/', async(req, res) => {
    let outDate = [];
    // const apiKey = '20VVI9Y4B7R1YR47';
    const apiKey = '20VVI9Y4B7R1YR47';
    const { range, fromCurrency, toCurrency } = req.query;    
    if (!fromCurrency || !toCurrency || !range) {
      return res
        .status(400)
        .json(
          {message:'One or more of the fields are missing'}
        );
    }
    // await fetch(`https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${apiKey}`)
    await fetch(`https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=USD&apikey=demo`)
    .then((response) => response.text())
    .then((body) => {
      var inData = JSON.parse(body);
      inData = inData['Time Series FX (Weekly)'];
      let i=0;      
      for(v in inData) {
          outDate.push({"week_num":`week ${i+1}`, "date":v, "value":inData[v]['4. close']});

          i++;
          if(i==parseInt(range)){break;}
      };
      // console.log(outDate);      
      res.json({value: outDate});
    })
    .catch((err) => {
      console.log("eroor" + err);
      res.json({message:'Failed to fetch data'});
    }); 
});

module.exports = router;