import React from "react";
import "./Sidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import Users from "../Users/Users";
import Allusers from "../Users/Allusers/Allusers";
import { useSelector } from "react-redux";

function Sidebar() {
  const darkMode = useSelector((state) => state.darkMode);
  return (
    <div className="sidebar">
      <div className="input">
        <SearchIcon />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className={!darkMode ? "users" : "users darkMode"}>
        <Users />
      </div>
      <div className={!darkMode ? "users" : "users darkMode"}>
        <Allusers />
      </div>
    </div>
  );
}

export default Sidebar;
