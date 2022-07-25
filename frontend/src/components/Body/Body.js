import React from "react";
import Room from "../Room/Room";
import Sidebar from "../Sidebar/Sidebar";
import "./Body.css";
function Body() {
  return (
    <div className="body">
      <Sidebar />
      <Room />
    </div>
  );
}

export default Body;
