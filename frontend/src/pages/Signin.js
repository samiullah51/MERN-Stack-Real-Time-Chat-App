import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Signin.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../redux/user/userAction";
import { ToastContainer, toast } from "react-toastify";

function Signin() {
  // dispatch user from redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let navigate = useNavigate();
  // email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sending request to backend api for login
  const handleClick = async () => {
    if (!email || !password) {
      toast.error(`Please fill the required fields`, {
        position: "bottom-center",
        autoClose: "100",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else {
      const savedUser = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );
      // navigate to home page after login
      let currentUser = localStorage.setItem(
        "user",
        JSON.stringify(savedUser.data)
      );

      let getUser = localStorage.getItem("user");
      const con = JSON.parse(getUser);
      dispatch({ type: LOG_IN, payload: con });
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <Navbar />
      <div className="login">
        <h2>Login to your Account</h2>
        <div className="loginContainer">
          <div className="inputGroup">
            <label>Email</label>
            <input
              type="text"
              autoComplete={false}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <Link to="/register">I don't have account.</Link>
          </div>
          <div className="inputGroup">
            <button onClick={handleClick}>Login</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signin;
