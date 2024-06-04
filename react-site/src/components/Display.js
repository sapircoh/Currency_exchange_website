import React, { useState, useEffect } from "react";

function Display({ activeMenu }) {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState({});
  const [conversionResult, setConversionResult] = useState(null);
  const [message, setMessage] = useState(null);
  const currencies = ["GBP", "USD", "EUR", "ILS"];
  
  useEffect(() => {    
    fetchExchangeRates();
  }, [fromCurrency]);

  const fetchExchangeRates = async () => {
    try {
      if (!fromCurrency) {        
        return;
      }

      const apiKey = "9f96c186ad4629eb33dbb614e88e4569"; 
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value;
    // Validate input as a positive number
    if (/^\d*\.?\d*$/.test(inputAmount)) {
      setAmount(inputAmount);
    }
  };

  //handel my history
  const handleHistory = (rst) => {
    const historyData = {
      category:'Currency conversion',
      search:{fromCurrency, toCurrency, amount}, 
      results:rst
    };
    try{
      fetch('http://localhost:3001/history/update',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(historyData)
      })
      .then((res) => res.json())      
    }
    catch(err) {console.log(err);}
  }

  const handleCalculate = () => {
    setConversionResult(null);
    if (!amount || !fromCurrency || !toCurrency) {
      setMessage("Please enter all required information.");
      return;
    }

    if (!exchangeRates[toCurrency]) {
      setMessage("Exchange rate not available for the selected currency.");
      return;
    }
    setMessage(null);
    const convertedAmount = (
      amount * exchangeRates[toCurrency]
    ).toFixed(2);

    // Update the state with the calculated result
    setConversionResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    handleHistory(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
  };

  if (activeMenu === "Currency_conversion") {
    return (
      <div className="display">
        <h1>Currency conversion</h1>
        <div>
          <label htmlFor="amount">Amount:</label>
          <br />
          <br />
          <input
            id="amount"
            type="text"
            value={amount}            
            onChange={handleAmountChange}
          />
          <br />
          <label htmlFor="fromCurrency">Convert from:</label>
          <br />
          <br />
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="">Select Currency</option>
            {currencies
              .filter((currency) => currency !== toCurrency)
              .map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="toCurrency">Convert to:</label>
          <br />
          <br />
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="">Select Currency</option>
            {currencies
              .filter((currency) => currency !== fromCurrency)
              .map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <button className="submit" onClick={handleCalculate}>Calculate</button>
        <br>
        </br>
        <div style={{fontSize:'20px'}}>
          <strong>{conversionResult && <div>{conversionResult}</div>}</strong>
        </div>
        {message && <div style={{fontSize:'20px',color:'red'}}>One or more of the fields are missing</div>}

      </div>
    );
  }
}

export default Display;