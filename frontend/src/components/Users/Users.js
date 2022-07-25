import React, { useEffect, useRef, useState } from "react";
import "./Users.css";
import User from "./User/User";
import axios from "axios";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { io } from "socket.io-client";

function Users() {
  // Get the current user from the redux store
  const user = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);

  // Using socket.io for real time conversation
  const socket = useRef(io("ws://localhost:8900"));
  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get(
        "http://localhost:8000/api/conversation/" + user._id
      );
      socket.current.emit("conversations", users);
      socket.current.on("getData", (data) => {
        setConversations(data.data);
      });
    };
    getUsers();
  }, [conversations]);

  return (
    <div>
      <div className="user">
        <h3>Conversations</h3>
        {!conversations?.length > 0 ? (
          <Alert severity="primary">
            You do not have any friends yet to Chat with. Please Click on a User
            to chat with
          </Alert>
        ) : (
          conversations?.map((c) => <User conversation={c} user={user} />)
        )}
      </div>
    </div>
  );
}

export default Users;
