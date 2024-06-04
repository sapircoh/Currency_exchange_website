const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.get('/', async(req, res) => {
    const apiKey = 'W3Q94H9NLBFAH047';
    const { date, fromCurrency, toCurrency } = req.query;    
    if (!fromCurrency || !toCurrency || !date) {
      return res
        .status(400)
        .json(
          {message:'One or more of the fields are missing'}
        );
    }
    await fetch(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${apiKey}`)
    .then((response) => response.text())
    .then((body) => {
      var data = JSON.parse(body);
      data = data['Time Series FX (Daily)'][date]['4. close'];
      res.json({value: data});
    })
    .catch((err) => {
      console.log(err);
      res.json({message:'Failed to fetch data'});
    }); 
});

module.exports = router;