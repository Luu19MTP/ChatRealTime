import {
  useContext,
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [connection, setConnection] = useState(false);
  const wsRef = useRef(null);
  const [response, setResponse] = useState(null);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState(null);
  const [flag, setFlag] = useState(false);
  const [login_code, setLogin_code] = useState(null);
  const [msg, setMsg] = useState(0);
  const [status, setStatus] = useState(null);
 

  const updateStatus = useCallback((data) => {
    setStatus(data);
  },[]);

  const updateMsg = useCallback(() => {
    setMsg((msg) => msg + 1);
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    wsRef.current = ws;
    setConnection(true);
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
      Relogin();
    });

    ws.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      setResponse(res);
      console.log("websocket said:", res);
      if (res.event == "SEND_CHAT") {
        updateMsg();
      }
    });

    ws.addEventListener("close", () => {
      console.log("Connection is closed");
      setConnection(false);
    });

    return () => {
      ws.close();
    };
  }, []);

  const SendMessage = (msg) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const RegisterContext = (username, password) => {
    const register_msg = {
      action: "onchat",
      data: {
        event: "REGISTER",
        data: {
          user: username,
          pass: password,
        },
      },
    };
    SendMessage(register_msg);
  };

  const LoginContext = (username, password) => {
    const login_msg = {
      action: "onchat",
      data: {
        event: "LOGIN",
        data: {
          user: username,
          pass: password,
        },
      },
    };
    SendMessage(login_msg);
  };

  const LogoutContext = () => {
    const logout_msg = {
      action: "onchat",
      data: {
        event: "LOGOUT",
      },
    };
    SendMessage(logout_msg);
  };

  const Relogin = useCallback(() => {
    let username = JSON.parse(localStorage.getItem("username")) + "";
    let token = JSON.parse(localStorage.getItem("login_code"));
    let login_code = token.RE_LOGIN_CODE;
    const relogin_msg = {
      action: "onchat",
      data: {
        event: "RE_LOGIN",
        data: {
          user: username,
          code: login_code,
        },
      },
    };
    SendMessage(relogin_msg);
    wsRef.current.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      if (res.event == "RE_LOGIN" && res.status == "success") {
        let data = res.data;
        let token = data.RE_LOGIN_CODE;
        setLogin_code(token);
        let obj = { RE_LOGIN_CODE: token };
        localStorage.setItem("login_code", JSON.stringify(obj));
      }
      wsRef.current.removeEventListener("message", this);
    });
  }, [connection]);

  const GetUserList = useCallback(() => {
    return new Promise((resolve) => {
      const getuser_msg = {
        action: "onchat",
        data: {
          event: "GET_USER_LIST",
        },
      };
      SendMessage(getuser_msg);
      if (connection) {
        wsRef.current.addEventListener("message", (event) => {
          const res = JSON.parse(event.data);
          resolve(res.data);
          wsRef.current.removeEventListener("message", this);
        });
      }
    });
  }, [connection, flag]);

  const CreateRoom = (roomName) => {
    const create_room_msg = {
      action: "onchat",
      data: {
        event: "CREATE_ROOM",
        data: {
          name: roomName,
        },
      },
    };
    SendMessage(create_room_msg);
  };

  const SendChat = (type, user, msg) => {
    updateMsg();

    // tang callRef
    const msg_people = {
      action: "onchat",
      data: {
        event: "SEND_CHAT",
        data: {
          type: type,
          to: user,
          mes: msg,
        },
      },
    };
    SendMessage(msg_people);
  };

  const GetChatPeople = useCallback(
    (people) => {
      return new Promise((resolve) => {
        const getChatPeople_msg = {
          action: "onchat",
          data: {
            event: "GET_PEOPLE_CHAT_MES",
            data: {
              name: people,
              page: 1,
            },
          },
        };
        SendMessage(getChatPeople_msg);
        if (connection) {
          wsRef.current.addEventListener("message", (event) => {
            const res = JSON.parse(event.data);
            resolve(res.data);
            wsRef.current.removeEventListener("message", this);
          });
        }
      });
    },
    [connection]
  );

  const GetChatRoom = useCallback(
    (room) => {
      return new Promise((resolve) => {
        const getRoom_msg = {
          action: "onchat",
          data: {
            event: "GET_ROOM_CHAT_MES",
            data: {
              name: room,
              page: 1,
            },
          },
        };
        SendMessage(getRoom_msg);
        if (connection) {
          wsRef.current.addEventListener("message", (event) => {
            const res = JSON.parse(event.data);
            resolve(res.data.chatData);
            wsRef.current.removeEventListener("message", this);
          });
        }
      });
    },
    [connection]
  );

  const JoinRoom = (roomName) => {
    const join_room_msg = {
      action: "onchat",
      data: {
        event: "JOIN_ROOM",
        data: {
          name: roomName,
        },
      },
    };
    SendMessage(join_room_msg);
  };

  const CheckUserContext = useCallback(
    (username) => {
      const check_user_msg = {
        action: "onchat",
        data: {
          event: "CHECK_USER",
          data: {
            user: username,
          },
        },
      };

      SendMessage(check_user_msg);

      // Lắng nghe và xử lý dữ liệu trả về từ WebSocket
      const handleCheckUserResponse = (event) => {
        const res = JSON.parse(event.data);
        if (res.event === "CHECK_USER" && res.status === "success") {
          updateStatus(res.data.status);
        }
      };

      // Thêm sự kiện lắng nghe
      wsRef.current.addEventListener("message", handleCheckUserResponse);

      // Hủy bỏ sự kiện lắng nghe khi component bị unmount
      return () => {
        wsRef.current.removeEventListener("message", handleCheckUserResponse);
      };
    },
    [updateStatus]
  );

  const value = {
    msg,
    login_code,
    connection,
    response,
    name,
    users,
    flag,
    status,
    Relogin,
    GetUserList,
    setResponse,
    setName,
    RegisterContext,
    LoginContext,
    LogoutContext,
    CreateRoom,
    JoinRoom,
    GetChatPeople,
    SendChat,
    GetChatRoom,
    updateMsg,
    CheckUserContext,
    updateStatus,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
