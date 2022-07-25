import React from "react";
import "./Sidebar.css";
import SearchIcon from "@mui/icons-material/Search";
import Users from "../Users/Users";
import Allusers from "../Users/Allusers/Allusers";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="input">
        <SearchIcon />
        <input type="text" placeholder="Search here..." />
      </div>
      <div className="users">
        <Users />
      </div>
      <div className="users">
        <Allusers />
      </div>
    </div>
  );
}

export default Sidebar;
