import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Conversation from "../Conversation/Conversation";
import Chats from "../Chats/Chats";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import socket from "../../socket";

const Dashboard = ({ setLoginFunc }) => {
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [queryParam, setQueryParam] = useState("");
  const [searchData, setSearchedData] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const ref = useRef();
  const navigate = useNavigate();

  const handleSelectedUser = (id, userDetails) => {
    setSelectedUserDetails(userDetails);
    setSelectedId(id);
    socket.emit("joinConversation", id);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchedData([]);
      setQueryParam("");
    }
  };

  let fetchConversation = async () => {
    await axios
      .get("http://https://chat-app-5-fhsa.onrender.com/api/conversation/get-conversation", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setConversation(response.data.conversation);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserBySearch = async () => {
    await axios
      .get(
        `https://chat-app-5-fhsa.onrender.com/api/auth/searchedMember?queryParam=${queryParam}`,
        { withCredentials: true }
      )
      .then((response) => {
        setSearchedData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (queryParam.length !== 0) {
      fetchUserBySearch();
    }
  }, [queryParam]);

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    if (searchData.length) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchData]);

  const handleLogout = async () => {
    await axios
      .post(
        "https://chat-app-5-fhsa.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        localStorage.clear();
        setLoginFunc(false);
        navigate("/");
        // console.log("object")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateConv = async (id) => {
    await axios
      .post(
        `https://chat-app-5-fhsa.onrender.com/api/conversation/add-conversation`,
        { receiverId: id },
        { withCredentials: true }
      )
      .then((response) => {
        // window.location.reload();
        fetchConversation();
        setSearchedData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="dashboard-conversation">
          <div className="dashboard-conversation-block">
            <div className="dashboard-title-block">
              <div>Chats</div>
              <div onClick={handleLogout}>
                <LogoutIcon sx={{ fontSize: "32px", cursor: "pointer" }} />
              </div>
            </div>

            <div className="search-box">
              <input
                value={queryParam}
                onChange={(event) => {
                  setQueryParam(event.target.value);
                }}
                type="text"
                placeholder="Search.."
                className="search-box-div"
              />
              <button className="search-icon" type="submit">
                <SearchIcon />
              </button>

              {searchData.length ? (
                <div ref={ref} className="searched-box">
                  {searchData.map((item, index) => {
                    return (
                      <div
                        className="search-item"
                        key={index}
                        onClick={() => handleCreateConv(item._id)}
                      >
                        <img
                          className="serach-item-profile"
                          src={item.profilePic}
                        />
                        <div>{item.name}</div>
                        <div className="search-item-mobile">
                          {item.mobileNumber}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : queryParam.length !== 0 && searchData.length === 0 ? (
                <div ref={ref} className="searched-box">
                  <div className="search-item">
                    <img
                      className="serach-item-profile"
                      src="https://img.freepik.com/free-vector/cheerful-young-girl-vector-portrait_1308-163430.jpg?ga=GA1.1.1408379961.1714224392&semt=ais_hybrid"
                    />
                    <div>No Data Found</div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="conv-block">
              {conversation.map((item, index) => {
                return (
                  <Conversation
                    active={item._id === selectedId}
                    handleSelectedUser={handleSelectedUser}
                    item={item}
                    id={item._id}
                    members={item.members}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {selectedUserDetails ? (
          <Chats
            selectedId={selectedId}
            selectedUserDetails={selectedUserDetails}
          />
        ) : (
          <div className="noChatSelected">
            <img
              className="noChatImage"
              src="https://cdni.iconscout.com/illustration/premium/thumb/chatting-illustration-download-in-svg-png-gif-file-formats--messenger-logo-like-online-communication-meetup-pack-people-illustrations-4912113.png?f=webp"
            />
            <div>No Chat Selected</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
