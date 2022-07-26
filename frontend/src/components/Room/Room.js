import React, { useEffect, useRef, useState } from "react";
import Messages from "../Messages/Messages";
import "./Room.css";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useSelector } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import Picker from "emoji-picker-react";
function Room() {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const selectedUser = useSelector((state) => state.selectedUser);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  // Dark mode
  const darkMode = useSelector((state) => state.darkMode);

  // handle new message
  const handleNewMessage = async () => {
    setLoading(true);
    const msg = {
      sender: user._id,
      text: message,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post("http://localhost:8000/api/messages", msg);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
    setMessage("");
  };
  // Handle Emoji
  const handleEmoji = () => {
    setChosenEmoji(!chosenEmoji);
  };

  // Pick Emoji
  const pickEmoji = (e, emoji) => {
    let msg = message;
    msg += emoji.emoji;
    setMessage(msg);
  };
  return (
    <div className="room">
      <div className={!darkMode ? "roomContainer" : "roomContainer darkMode"}>
        {/* Room Header */}
        {selectedUser && (
          <div className="roomHeader">
            <img src={selectedUser.profile} />
            <div className="info">
              <p className="username">{selectedUser.username}</p>
              <p className="lastSeen">Today 11:23 am</p>
            </div>
          </div>
        )}
        {/* Room Body */}
        <Messages />
        {/* Type Message */}
        {selectedUser && (
          <div className="bottomContainer">
            <div className="inputMsg">
              <input
                value={message}
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setMessage(e.target.value)}
              />
              <SentimentSatisfiedAltIcon
                onClick={handleEmoji}
                className={!chosenEmoji ? "emojiBtn" : "emojiBtn active"}
              />
              {chosenEmoji && (
                <div className="picker">
                  <Picker onEmojiClick={pickEmoji} />
                </div>
              )}
            </div>
            <div
              className={message ? "icon" : "icon disabled"}
              onClick={message && handleNewMessage}
            >
              {loading ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    margin: "5px 0",
                  }}
                >
                  <CircularProgress
                    color="inherit"
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
              ) : (
                <SendIcon />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Room;
