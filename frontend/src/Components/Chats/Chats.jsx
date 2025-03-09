import React, { useEffect, useState, useRef } from "react";
import "./Chats.css";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import socket from "../../socket";

const Chats = (props) => {
  const [content, setContent] = useState("");
  const [chats, setChats] = useState([]);
  const ownId = JSON.parse(localStorage.getItem("userInfo"))._id;

  const ref = useRef();

  const fetchMessages = async () => {
    await axios
      .get(
        `http://localhost:9000/api/chat/get-message-chat/${props.selectedId}`,
        { withCredentials: true }
      )
      .then((response) => {
        setChats(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.on("receiveMessage", (response) => {
      setChats([...chats, response]);
    });
  }, [chats]);

  useEffect(() => {
    fetchMessages();
    setContent("");
  }, [props.selectedId]);

  const handleSendMessage = async () => {
    if (content.trim().length === 0) return alert("Please Enter Message");
    await axios
      .post(
        `http://localhost:9000/api/chat/post-message-chat`,
        {
          conversation: props.selectedId,
          content: content,
        },
        { withCredentials: true }
      )
      .then((response) => {
        socket.emit("sendMessage", props.selectedId, response.data);
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ref?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chats]);

  return (
    <div className="dashboard-chats">
      <div className="chatNameBlock">
        <div className="chat-profile-img">
          <img
            className="profile-img-conv"
            src={props?.selectedUserDetails[0]?.profilePic}
          />
        </div>
        <div className="chat-name">{props?.selectedUserDetails[0]?.name}</div>
      </div>

      <div className="chats-block">
        {chats.map((item, index) => {
          return (
            <div
              ref={ref}
              key={index}
              className={`chat ${
                ownId === item?.sender?._id ? "message-me" : null
              }`}
            >
              <div className="chat-send-rev-img">
                <img
                  className="profile-img-conv"
                  src={item?.sender?.profilePic}
                />
              </div>
              <div className="message">{item.message}</div>
            </div>
          );
        })}
      </div>

      <div className="message-box">
        <div className="message-input-box">
          <input
            className="searchBox messageBox"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            placeholder="Type Your Message Here.."
          />
        </div>
        <div onClick={handleSendMessage}>
          <SendIcon
            sx={{ fontSize: "32px", margin: "10px", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
