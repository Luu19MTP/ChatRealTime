import { useContext, useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import "./Chat.css";
import { WebSocketContext } from "../../context/WebSoket";
const Chat = () => {
  console.log("-------------------------------------------");

  const { connection, GetUserList } = useContext(WebSocketContext);
  const [users, setUsers] = useState(null);
  const [x, setX] = useState(0);
  useEffect(() => {
    // Kết nối WebSocket đã được thiết lập, có thể thực hiện các hoạt động với nó
    const promise = GetUserList();
    promise.then((result) => {
      setUsers(result);
      console.log("result ben client la:", users);
    });

    console.log("chay 1 lan ben chat client");
  }, [x]);

  console.log("users", users);
  return (
    <>
      <button
        onClick={() => {
          setX(x + 1);
        }}
      >
        {x}
      </button>
      <div
        id="wrapper"
        className="container-fluid d-flex rounded-2 border p-1 gap-1"
      >
        <div className="left col-3 p-2 border-end">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <ChatList />
        </div>
        <div
          className="border-end right col-7 d-flex flex-column"
          style={{ height: 500 }}
        >
          <div className="info__chat border-bottom">
            <div className="avatar">
              <i className="fa-solid fa-circle-user fs-2 p-0"></i>
            </div>
            <div className="flex-grow-1">
              <div className="name">name</div>
              <div className="type">
                <i className="fa-solid fa-people-group"></i>
              </div>
            </div>
            <div className="detail">
              <i className="fa-solid fa-circle-info"></i>
            </div>
          </div>
          <div className="p-2 flex-grow-1"> sdfsf</div>
          <div className="d-flex p-2">
            <input
              className="flex-fill rounded"
              type="text"
              placeholder="Type a message"
            />
            <div className="btn">
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="member border-bottom d-flex">MEMBER</div>
        </div>
      </div>
    </>
  );
};

export default Chat;
