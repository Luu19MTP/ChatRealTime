import { useContext, useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import "./Chat.css";
import { WebSocketContext } from "../../context/WebSoket";
import ChatContent from "../../components/MessageContent";

const Chat = () => {
  const { connection, GetUserList, CreateRoom, JoinRoom, Relogin, login_code } =
    useContext(WebSocketContext);
  const [users, setUsers] = useState(null);
  const [x, setX] = useState(0);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [relogin, setRelogin] = useState(false);
  function handleClickToSaveName(username) {
    setUsername(username);
  }


  // Trong Chat component
  useEffect(() => {
    fetchData();
  }, [login_code]);

  const fetchData = async () => {
    try {
      const result = await GetUserList();
      setUsers(result);
      setRelogin(!relogin);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  const handleCreateRoom = () => {
    if (roomName) {
      const userNames = users ? users.map((user) => user.username) : [];
      if (rooms.includes(roomName) || userNames.includes(roomName)) {
        setError("Tên phòng đã tồn tại");
      } else {
        CreateRoom(roomName);
        setRooms((prevRooms) => [...prevRooms, roomName]);
        setRoomName("");
        setError("");
      }
    }
  };

  const handleJoinRoom = () => {
    if (roomName) {
      JoinRoom(roomName);
      setRoomName("");
    }
  };

  return (
    <>
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
          <div className="mt-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="btn btn-primary me-2" onClick={handleCreateRoom}>
              Create Room
            </button>
            <button className="btn btn-secondary" onClick={handleJoinRoom}>
              Join Room
            </button>
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <ChatList users={users} saveUsername={handleClickToSaveName} />
          <div className="mt-3">
            <h5>Rooms</h5>
            <ul className="list-unstyled">
              {rooms.map((room, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <div className="avatar">
                    <i className="fa-solid fa-circle-user fs-1 p-0"></i>
                  </div>
                  <div className="info flex-grow-1 ms-2">
                    <div className="name">{room}</div>
                    <div className="message">message</div>
                  </div>
                  <div className="time">
                    <span style={{ fontSize: 12 }}>11:11</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>
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
