import React, { useState } from "react";
import Menu from "./Menu";
import Display from "./Display";
import HistoricalData from "./historical";
import MyHistory from "./MyHistory";
import Trends from "./trends";

function Render() {
  const [activeMenu, setActiveMenu] = useState("My_history");

  return (
    <div className="Render">
      <Menu setActiveMenu={setActiveMenu} />
      <Display activeMenu={activeMenu} />
      <HistoricalData activeMenu={activeMenu} />
      <Trends activeMenu={activeMenu} />
      <MyHistory activeMenu={activeMenu} />
    </div>
  );
}

export default Render;