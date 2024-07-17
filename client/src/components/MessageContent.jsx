import React, { useContext, useEffect, useState, useRef } from "react";
import { WebSocketContext } from "../context/WebSoket";
import MessageList from "./MessageList";

export default function ChatContent({ name, type }) {
  const [chats, setChats] = useState(null);
  const { connection, GetChatPeople, GetChatRoom, SendChat } =
    useContext(WebSocketContext);

  let user = type == 1 ? "room" : "people";
  // let func = type == 1 ? GetChatRoom(name) : GetChatPeople(name);
  // console.log(user);

  const fetchData = async () => {
    try {
      const result =
        type == 1 ? await GetChatRoom(name) : await GetChatPeople(name);
      setChats(result);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách message:", error);
    }
  };

  useEffect(() => {
    if (connection) {
      fetchData();
    }
  }, [connection, name]);

  // console.log(GetChatRoom("fsd"));

  const sendChat = () => {
    let input = document.getElementById("input").value;
    SendChat(user, name, input);
    fetchData();
  };

  const handleSend = () => {
    // console.log(input);
    sendChat();
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleSend();
  //   }
  // };

  if (!chats) {
    return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
  }


  return (
    <>
      <div className="p-2 flex-grow-1 d-flex flex-column">
        
        <MessageList chats={chats}/>
      </div>

      <div className="d-flex p-2">
        <input
          id="input"
          className="flex-fill rounded"
          type="text"
          placeholder="Type a message"
        />
        <div className="btn" onClick={handleSend}>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </>
  );
}
