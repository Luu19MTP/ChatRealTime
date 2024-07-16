import React, { useContext, useEffect, useState, useRef } from "react";
import { WebSocketContext } from "../context/WebSoket";
import MessageList from "./MessageList";

export default function ChatContent({ name }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(null);
  const { connection, GetChatPeople } = useContext(WebSocketContext);

  const inputRef = useRef(""); // Khởi tạo useRef với giá trị ban đầu là null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetChatPeople(name);
        setChats(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách message:", error);
      }
    };

    if (connection) {
      fetchData();
    }
  }, [connection, name]);

  const handleSend = () => {
    const currentMessage = inputRef.current.value; // Lấy giá trị từ inputRef
    if (currentMessage.trim()) {
      // Gửi tin nhắn của người dùng
      setMessages([...messages, { text: currentMessage, isMyMessage: true }]);
      inputRef.current.value = ""; // Reset giá trị của input
    }
  };

  const currentMessage = inputRef.current.value; // Lấy giá trị từ inputRef

  console.log(currentMessage);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  if (!chats) {
    return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
  }

  return (
    <>
      <div className="p-2 flex-grow-1 d-flex flex-column">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              alignSelf: msg.isMyMessage ? "flex-end" : "flex-start",
              backgroundColor: msg.isMyMessage ? "#DCF8C6" : "#FFF",
              borderRadius: "10px",
              padding: "10px",
              margin: "5px",
              maxWidth: "60%",
            }}
          >
            {msg.text}
          </div>
        ))}
        <MessageList chats={chats} />
      </div>

      <div className="d-flex p-2">
        <input
          className="flex-fill rounded"
          type="text"
          placeholder="Type a message"
          value={message}
          ref={inputRef} // Gán ref vào input
          onChange={(e) => (inputRef.current = e.target.value)} // Cập nhật state message khi input thay đổi
          onKeyPress={handleKeyPress} // Xử lý sự kiện nhấn phím Enter
        />
        <div className="btn" onClick={handleSend}>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </>
  );
}
