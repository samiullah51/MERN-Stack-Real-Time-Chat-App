import React, { useEffect, useState } from "react";
import "./Allusers.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Allusers() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect to get All users
  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get("http://localhost:8000/api/get/users");
      setLoading(false);
      setUsers(users.data);
    };
    getUsers();
  }, []);

  //  Add a user to conversaton
  const handleClick = async (id, username) => {
    const checks = await axios.get(
      "http://localhost:8000/api/conversation/find/" + user._id
    );
    let friendid = null;
    checks.data.map((check) => {
      friendid = check.members?.find((m) => m === id);
    });

    // Check if friend is already exist
    if (friendid) {
      toast.error(`${username} is already exist in your conversation`, {
        position: "bottom-center",
        autoClose: "100",
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return false;
    } else {
      try {
        const makeConversation = await axios.post(
          "http://localhost:8000/api/conversation/",
          {
            senderId: user._id,
            recieverId: id,
          }
        );
        toast.success(`${username} added to your conversation`, {
          position: "bottom-center",
          autoClose: "100",
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div>
      <div className="user">
        <h3>All Users</h3>
        {!loading ? (
          users.map((u) => (
            <div
              className="userConversation"
              onClick={() => handleClick(u._id, u.username)}
            >
              <img src={u.profile} />
              <p>{u.username}</p>
              {u._id === user._id && <div className="owner"></div>}
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", margin: "5px 0" }}>
            <CircularProgress style={{ width: "25px", height: "25px" }} />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Allusers;
