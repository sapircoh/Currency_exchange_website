import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { useRef, useEffect } from 'react';


const minDate = new Date();
minDate.setDate(minDate.getDate() - 90);

function HistoricalData({ activeMenu }) {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [apiData, setApiData] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const currencies = ["GBP", "USD", "EUR", "ILS"];
 
  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleDateChange = date => {
    setSelectedDate(date); 
  };

  //handel my history
  const handleHistory = (rst) => {
    const historyData = {
      category:'Historical and current rates',
      search:{fromCurrency, toCurrency, selectedDate}, 
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

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/data?date=${selectedDate.toISOString().split('T')[0]}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`
        );
      const data = await response.json();
      if(data.message){ setMessage(data.message);}
      if (data.value) {
        setApiData(`1 ${fromCurrency} = ${data.value} ${toCurrency}`);        
        setMessage(null);
        handleHistory(`1 ${fromCurrency} = ${data.value} ${toCurrency}`);
      } else {
        setApiData(null);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiData(null);
    }
  };

  useEffect(()=>{div.current?.lastElementChild?.scrollIntoView()});

  const div = useRef(null);
  if(activeMenu === "Historical_and_current_rates"){
  return (
      <div className='historical' ref={div}>
        <br></br>
        <h1>Historical and current rates</h1>      
        <p className="sub_title">historical rates data up to 90 days back</p>  
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          maxDate={new Date()}
          minDate={minDate}
          formatShortWeekday = {(locale, date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]  }        
        />
        <br></br>
        <p className="sub_title">Selected date: {selectedDate.toLocaleDateString().slice(0, 10)} </p>       
        <div className='select_currency'>
          <div>
            <label htmlFor="fromCurrency">Convert from: </label>
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
            <label htmlFor="toCurrency">Convert to: </label>
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
        <br></br>
        <br></br>
       <button className="submit" type="button" onClick={handleSubmit}>Calculate</button>
        <form onSubmit={HistoricalData}>
          <br></br>
        {apiData && (
          <p className="msg" style={{color:'white'}}>
            {apiData}
          </p>
        )}
        {message && (
          <p className="msg" style={{color: 'red'}}>
           {message}
          </p>
        )}
        </form>
       </div>    
    )
  }
}
export default HistoricalData;