import React, { useState, useEffect } from "react";
import './myHistory.css';

function MyHistory({ activeMenu }) {
    const [historyData, setHistoryData] = useState([]);
    
    useEffect(() => {
      try{
        fetch('http://localhost:3001/history')
        .then((res) => res.json())
        .then((data) => {
          if(data){
            setHistoryData([data.history[0],data.history[1],data.history[2]]);
          }
        });
      }
      catch(err) {
        console.log(err);
      }
      console.log(historyData);
    }, [activeMenu === "My_history"]);


    if (activeMenu === "My_history") {
      return (
        <div className="myhistory">
            <h1>My history</h1>
            <div className="table-container">
            <table border={2}>
              <thead key={0}>
                <tr>
                  <th>category</th>
                  <th>search</th>
                  <th>result</th>
                </tr>
              </thead>
              <tbody>
                {
                  JSON.stringify(historyData)!==JSON.stringify([{},{},{}])?(
                  historyData.map((item, index=0) => (
                    item.category?(
                    <tr key={index++}>
                        <td>{item.category}</td>
                        <td>{item.search}</td>
                        <td>{item.results}</td>
                      </tr> 
                    ):''
                  ))):console.log(JSON.stringify(historyData))
                }               
              </tbody>
            </table>
            <br></br>       
            <div>{JSON.stringify(historyData)===JSON.stringify([{},{},{}])? <p>no history was found</p>:''}</div>
          </div>
        </div>
        );
    }
}
export default MyHistory;