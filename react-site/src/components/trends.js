import React, { useState, useEffect, useRef } from "react";
import{Chart, defaults} from "chart.js/auto";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = '#000';
defaults.font.size=12;

function Trends({ activeMenu }) {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [range, setRange] = useState("");
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState(null);
  const currencies = ["GBP", "USD", "EUR", "ILS"];
  

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };
  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/trends?range=${range}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`
        );
      const data = await response.json();
      if(data.message){ setMessage(data.message);}
      if (data.value) {
        setResults(data.value);        
        setMessage(null);    
      } else {
        setResults(null);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults(null);
    }
  };

  useEffect(()=>{div.current?.lastElementChild?.scrollIntoView()});
  const div = useRef(null);

  if (activeMenu === "Trends") {
    return (
      <div className="display" ref={div}>
        <h1>Trends</h1>
        <div className="select_currency">
        <div>
          <label htmlFor="fromCurrency">Convert from:</label>          
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
          </div>
          <br></br><br></br>
          <fieldset className="selectRange">
            <legend> Select time range: </legend>
            <label className="label">
              <input type="radio" name="range" value="4"  onChange={handleRangeChange}/>
              <span className="option">1 month</span>
            </label>
            <label className="label">
              <input type="radio" name="range" value="13" onChange={handleRangeChange} />
              <span className="option">3 months</span>
            </label>
            <label className="label">
              <input type="radio" name="range" value="26" onChange={handleRangeChange} />
              <span className="option">6 months</span>
            </label>
            <label className="label">
              <input type="radio" name="range" value="52" onChange={handleRangeChange} />
              <span className="option">1 year</span>
            </label>
          </fieldset>      
        <button className="submit" onClick={handleSubmit}>Calculate</button>
        <br>
        </br>
        <div style={{fontSize:'20px'}}>
          {/* <strong>{results && <div>hey</div>}</strong> */}
          {results && (<div className="line"><Line
            data={{
              labels: results.map((rst)=>rst.week_num),
              datasets: 
              [{
                label:"currency value",
                data:results.map((rst)=>rst.value),
                tension: 0.2,
                backgroundColor:"rgb(75, 192, 192)",
                borderColor:"rgb(75, 192, 192)"
              }]
            }}
            ></Line></div>)}
        </div>
        {message && <div style={{fontSize:'20px',color:'red'}}>{message}</div>}
      </div>
    );
  }
}

export default Trends;