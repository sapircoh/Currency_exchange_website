import React from "react";
import "./menu.css";

function Menu({ setActiveMenu }) {
  const setCurrencyConvert = () => {
    setActiveMenu("Currency_conversion");
  };
  const setHistorical = () => {
      setActiveMenu("Historical_and_current_rates");
  }
  
  const setMyHistory = () => {
    setActiveMenu("My_history");
}

const setTrends = () => {
  setActiveMenu("Trends"); 
}

  return (
    <div className="menu">
      <div className="menu-item" onClick={setHistorical} >
        Historical and future rates
      </div>
      <div className="menu-item"  onClick={setMyHistory}>
        My history
      </div>
      <div className="menu-item" onClick={setTrends}>
        Trends
      </div>
      <div className="menu-item" onClick={setCurrencyConvert}>
        Currency conversion        
      </div>
    </div>
  );
}

export default Menu;