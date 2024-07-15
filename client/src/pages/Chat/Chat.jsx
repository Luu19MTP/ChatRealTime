import ChatList from "../../components/ChatList";
import "./Chat.css";
import { WebSocketContext } from "../../context/WebSoket";
import { useContext, useEffect, useState } from "react";
import ChatContent from "../../components/ChatContent";

const Chat = () => {
  const { connection, GetUserList } = useContext(WebSocketContext);
  const [users, setUsers] = useState(null);
  const [x, setX] = useState(0);
  const [username, setUsername] = useState(null);
  function handleClickToSaveName(username) {
    setUsername(username);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetUserList();
        setUsers(result);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };

    if (connection) {
      fetchData();
    }
  }, [connection, GetUserList, x]);

  // console.log(users);
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
          <ChatList users={users} saveUsername={handleClickToSaveName} />
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
              <div className="name">{username}</div>
              <div className="type">
                <i className="fa-solid fa-people-group"></i>
              </div>
            </div>
            <div className="detail">
              <i className="fa-solid fa-circle-info"></i>
            </div>
          </div>
          {username !== null ? <ChatContent name={username} /> : null}
        </div>
      </div>
      <div className="col-2">
        <div className="member border-bottom d-flex">MEMBER</div>
      </div>
    </>
  );
};

export default Chat;
