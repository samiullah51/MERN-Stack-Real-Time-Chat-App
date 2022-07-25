import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOG_OUT } from "../../redux/user/userAction";
import "./Navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
function Navbar() {
  // fetch user from redux store
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Hanlde logout
  const handleLogOut = () => {
    dispatch({ type: LOG_OUT });
    localStorage.clear();
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src="https://i.pinimg.com/564x/9b/f0/d0/9bf0d084963d20b664b5ff32a9c8e271.jpg" />
      </Link>
      {user ? (
        <div className="right">
          <p style={{ fontSize: "18px" }}>{user.username}</p>
          <img src={user.profile} />
          <div className="logOutBtn" onClick={handleLogOut}>
            <span>Log Out</span>
            <LogoutIcon />
          </div>
        </div>
      ) : (
        <div className="join">
          <Link to="/register">Join Now</Link>
          <Link className="loginBtn" to="/login">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
