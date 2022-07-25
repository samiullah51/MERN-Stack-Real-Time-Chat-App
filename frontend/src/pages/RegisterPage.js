import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./RegisterPage.css";
import axios from "axios";
import { images } from "../images";
import { ToastContainer, toast } from "react-toastify";

function RegisterPage() {
  // initializing username, email,passowrd and confirm password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [profile, setProfile] = useState("");
  // navigate hook to navigate login page after creating account
  let navigate = useNavigate();

  // sending credentials to backend api for creating new account

  const handleClick = async () => {
    // handleValidation
    if (!username || !email || !password || !cpassword) {
      toast.error(`Please fill the required fields`, {
        position: "bottom-center",
        autoClose: "100",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else if (password.length < 6 || password.length > 15) {
      toast.error(`Password should be from 8-15 characters`, {
        position: "bottom-center",
        autoClose: "100",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else if (password !== cpassword) {
      toast.error(`Password did not match`, {
        position: "bottom-center",
        autoClose: "100",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else {
      const savedUser = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          username,
          email,
          password,
          profile: images[Math.floor(Math.random() * 19)],
        }
      );
      navigate("/login", { replace: true });
    }
  };
  return (
    <>
      <Navbar />
      <div className="register">
        <h2>Create New Account</h2>
        <div className="registerContainer">
          <div className="inputGroup">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <Link to="/login">I have already an account.</Link>
          </div>
          <div className="inputGroup">
            <button onClick={handleClick}>Create Account</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default RegisterPage;
