import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../context/WebSoket";
import MessageList from "./MessageList";

export default function MessageContent({ name }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);

  const { connection, GetChatPeople, GetChatRoom } = useContext(WebSocketContext);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const set = await GetChatRoom(name);  // Lấy tin nhắn từ phòng chat
        setChatRoom(set);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin nhắn phòng chat:", error);
      }
    };

    
    const fetchData = async () => {
      try {
        const result = await GetChatPeople(name);
        setChats(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách message:", error);
      }
    };

   

    if (connection) {
      fetchData(); // Lấy danh sách tin nhắn người dùng
      fetchRoomData(); // Lấy danh sách tin nhắn từ phòng chat
    }
  }, [connection, name, GetChatPeople, GetChatRoom]);

  const handleSend = () => {
    if (message.trim()) {
      // Gửi tin nhắn của người dùng
      setMessages([...messages, { text: message, isMyMessage: true }]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  if (!chats) {
    return <div>Loading...</div>; // Hoặc hiển thị một thông báo tải dữ liệu
  }

  if (!chatRoom) {
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
        <MessageList chats={chats} chatRoom={chatRoom} />
      </div>

      <div className="d-flex p-2">
        <input
          className="flex-fill rounded"
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="btn" onClick={handleSend}>
          <i className="fa-solid fa-paper-plane"></i>
        </div>
      </div>
    </>
  );
}
