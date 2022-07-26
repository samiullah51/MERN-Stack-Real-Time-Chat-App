import React from "react";
import { useSelector } from "react-redux";
import Room from "../Room/Room";
import Sidebar from "../Sidebar/Sidebar";
import "./Body.css";
function Body() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={!darkMode ? "body" : "body darkMode"}>
      <Sidebar />
      <Room />
    </div>
  );
}

export default Body;
