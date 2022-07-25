import { Alert } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Messages.css";
import ReactTimeAgo from "react-time-ago";
function Messages() {
  const user = useSelector((state) => state.user);
  const currentChat = useSelector((state) => state.currentChat);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const selectedUser = useSelector((state) => state.selectedUser);

  //  fetch messages from backend api
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/messages/" + currentChat?._id
        );

        setMessages(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getMessages();
  }, [messages]);
  //
  // Scroll behavoir
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="msges" ref={scrollRef}>
      {currentChat ? (
        <>
          {messages.length > 0 ? (
            messages.map((m) => (
              <div className={m.sender === user._id ? "sender" : "reciever"}>
                {m.sender !== user._id && <img src={selectedUser?.profile} />}
                <p>{m.text}</p>
                <p className="sendAt">
                  <ReactTimeAgo date={m.createdAt} locale="en-US" />
                </p>
              </div>
            ))
          ) : (
            <div className="alert">
              <img src="https://cdn.dribbble.com/users/3377233/screenshots/6958190/busy_texting.gif" />
              <Alert severity="success">
                There is no Conversation yet with {selectedUser.username}! Leave
                a message for him to start conversation with.
              </Alert>
            </div>
          )}
        </>
      ) : (
        <div className="welcomeChat">
          <img src="https://zellusmarketing.com/wp-content/uploads/2021/03/Marketing-Chat-gif.gif" />
          <h2>Welcome {user?.username}</h2>
          <p>Click a Conversation to Chat With</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
