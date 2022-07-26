import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Body from "../components/Body/Body";
import { useDispatch, useSelector } from "react-redux";
import { DARK_MODE } from "../redux/user/userAction";
import "./HomePage.css";
function HomePage() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatchDark = useDispatch();
  return (
    <div className="homepage">
      <button
        className={darkMode ? "btn" : "btn active"}
        onClick={() => dispatchDark({ type: DARK_MODE })}
      ></button>
      <Navbar />
      <Body />
    </div>
  );
}

export default HomePage;
