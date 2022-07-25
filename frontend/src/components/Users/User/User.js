import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CURRENT_CHAT, SELECT_USER } from "../../../redux/user/userAction";
import "./User.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function User({ conversation, user }) {
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const friendId = conversation.members?.find((m) => m !== user._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/get/user?userId=" + friendId
        );
        setLoading(false);
        setFriend(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, []);

  // handle Dispatch for current chat
  const handleDisptach = () => {
    dispatch({ type: CURRENT_CHAT, payload: conversation });
    dispatch({ type: SELECT_USER, payload: friend });
  };
  return (
    <div className="user">
      <div className="main" onClick={handleDisptach}>
        {!loading ? (
          <div className="left">
            <img src={friend?.profile} />
            <div className="info">
              <p className="username">{friend?.username}</p>
              <p className="lastMsg"></p>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", textAlign: "center", margin: "5px 0" }}>
            <CircularProgress style={{ width: "25px", height: "25px" }} />
          </div>
        )}
        <div className="right">
          <p className="lastSeen">{user.lastSeen}</p>
          {user.newMsgs && <p className="badge">{user.newMsgs}</p>}
        </div>
      </div>
    </div>
  );
}

export default User;
