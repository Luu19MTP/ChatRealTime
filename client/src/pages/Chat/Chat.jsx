// import { useContext, useEffect, useState } from "react";
// import ChatList from "../../components/ChatList";
// import "./Chat.css";
// import { WebSocketContext } from "../../context/WebSoket";

// const Chat = () => {
//   console.log("-------------------------------------------");

//   const { connection, GetUserList } = useContext(WebSocketContext);
//   const [users, setUsers] = useState(null);
//   const [x, setX] = useState(0);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Kết nối WebSocket đã được thiết lập, có thể thực hiện các hoạt động với nó
//     const promise = GetUserList();
//     promise.then((result) => {
//       setUsers(result);
//       console.log("result ben client la:", users);
//     });

//     console.log("chay 1 lan ben chat client");
//   }, [x]);

//   console.log("users", users);

//   const handleSend = () => {
//     if (message.trim()) {
//       // Giả sử mỗi tin nhắn có cấu trúc { text: string, isMyMessage: boolean }
//       setMessages([...messages, { text: message, isMyMessage: true }]);
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={() => {
//           setX(x + 1);
//         }}
//       >
//         {x}
//       </button>
//       <div
//         id="wrapper"
//         className="container-fluid d-flex rounded-2 border p-1 gap-1"
//       >
//         <div className="left col-3 p-2 border-end">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//           />
//           <ChatList />
//         </div>
//         <div
//           className="border-end right col-7 d-flex flex-column"
//           style={{ height: 500 }}
//         >
//           <div className="info__chat border-bottom">
//             <div className="avatar">
//               <i className="fa-solid fa-circle-user fs-2 p-0"></i>
//             </div>
//             {/* Tên người dùng */}
//             <div className="flex-grow-1">
//               <div className="name">name</div>
//               <div className="type">
//                 <i className="fa-solid fa-people-group"></i>
//               </div>
//             </div>
//             <div className="detail">
//               <i className="fa-solid fa-circle-info"></i>
//             </div>
//           </div>
//           <div className="p-2 flex-grow-1 d-flex flex-column">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className="message"
//                 style={{
//                   alignSelf: msg.isMyMessage ? 'flex-end' : 'flex-start',
//                   backgroundColor: msg.isMyMessage ? '#DCF8C6' : '#FFF',
//                   borderRadius: '10px',
//                   padding: '10px',
//                   margin: '5px',
//                   maxWidth: '60%',
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="d-flex p-2">
//             <input
//               className="flex-fill rounded"
//               type="text"
//               placeholder="Type a message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <div className="btn" onClick={handleSend}>
//               <i className="fa-solid fa-paper-plane"></i>
//             </div>
//           </div>
//         </div>
//         <div className="col-2">
//           <div className="member border-bottom d-flex">MEMBER</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;


import { useState } from "react";
import ChatList from "../../components/ChatList";
import "./Chat.css";

const Chat = () => {
  const [users, setUsers] = useState([
    {
      name: "21130447",
      messages: [
        { text: "Hello there!", isMyMessage: false },
        { text: "Hi!", isMyMessage: true },
      ],
    },
    {
      name: "zzz",
      messages: [
        { text: "Hey!", isMyMessage: false },
        { text: "What's up?", isMyMessage: true },
      ],
    },
    {
      name: "minh",
      messages: [
        { text: "Good morning!", isMyMessage: false },
        { text: "Morning!", isMyMessage: true },
      ],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && selectedUser) {
      const newMessage = { text: message, isMyMessage: true };
      const updatedMessages = [...selectedUser.messages, newMessage];
      const updatedUsers = users.map(user =>
        user.name === selectedUser.name ? { ...user, messages: updatedMessages } : user
      );
      setUsers(updatedUsers);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="container-fluid d-flex rounded-2 border p-1 gap-1">
      <div className="left col-3 p-2 border-end">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <ChatList users={users} setSelectedUser={setSelectedUser} />
      </div>
      <div className="right col-7 d-flex flex-column">
        <div className="info__chat border-bottom">
          <div className="avatar">
            <i className="fa-solid fa-circle-user fs-2 p-0"></i>
          </div>
          <div className="flex-grow-1">
            <div className="name">{selectedUser ? selectedUser.name : ''}</div>
            <div className="type">
              <i className="fa-solid fa-people-group"></i>
            </div>
          </div>
          <div className="detail">
            <i className="fa-solid fa-circle-info"></i>
          </div>
        </div>
        <div className="messages-container flex-grow-1">
          {selectedUser && selectedUser.messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.isMyMessage ? 'my-message' : 'other-message'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container d-flex p-2">
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
      </div>
      <div className="col-2">
        <div className="member border-bottom d-flex">MEMBER</div>
      </div>
    </div>
  );
};

export default Chat;
