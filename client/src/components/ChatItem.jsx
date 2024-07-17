import { useContext, useEffect, useState } from "react";
import "./ChatItem.css";
import { WebSocketContext } from "../context/WebSoket";

const ChatItem = ({ item, saveUsername, saveType }) => {
  const [stt, setStt] = useState(null);
  const { CheckUserContext, GetUserList, status, updateStatus } =
    useContext(WebSocketContext);

  const loadStatus = async () => {
    try {
      let name = item.name;
      const re = await CheckUserContext(name);
      await setStt(status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStatus();
    console.log(item.name, stt);
  }, []);

  const handleClick = (e) => {
    saveUsername(item.name);
    saveType(item.type);
    // CheckUserContext(item.name);
  };

  return (
    <>
      <div>{status}</div>
      <div
        className={`user__item rounded-1 p-1 d-flex gap-3 text-dark align-items-center border-bottom mt-2`}
        onClick={(e) => handleClick(e)}
      >
        <div className="avatar">
          <i className="fa-solid fa-circle-user fs-1 p-0"></i>
        </div>
        <div className="info flex-grow-1">
          {/* <span style={{ display: "none" }} className="type">
            {item.type}
          </span> */}
          <div className={`on-or-off ${status ? "on" : "off"}`}>
            {status ? "ON" : "OFF"}
          </div>
          <div className="name">{item.name}</div>
          <div className="message">message</div>
        </div>
        <div className="time">
          <span style={{ fontSize: 12 }}>11:11</span>
        </div>
      </div>
    </>
  );
};

export default ChatItem;
