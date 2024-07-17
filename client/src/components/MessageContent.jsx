import React, { useContext, useEffect, useState, useRef } from "react";
import { WebSocketContext } from "../context/WebSoket";
import MessageList from "./MessageList";

export default function ChatContent({ name }) {
  const [chats, setChats] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const { connection, GetChatPeople, GetChatRoom } = useContext(WebSocketContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetChatPeople(name);
        setChats(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách message:", error);
      }
    };

    const fetchRoomData = async () => {
      try {
        const set = await GetChatRoom(name);
        setChatRoom(set);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách message:", error);
      }
    };

    if (connection) {
      fetchData();
      fetchRoomData();
    }
  }, [connection, name]);

  const handleSend = () => {
   let input = document.getElementById("input").value;
   console.log(input)
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
        <input id="input"
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
